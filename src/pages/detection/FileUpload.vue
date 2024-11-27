<template>
  <VaFileUpload v-model="files" dropzone file-types="json" :disabled="isUploadDisabled" @fileAdded="upload" />
  <div v-if="isUploadDisabled" class="progress-container">
    <VaProgressBar :model-value="percent" size="large" content-inside show-percent style="width: 80%" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useToast } from 'vuestic-ui'

import { FileSlice, getFileMD5 } from '../../services/fileutils'
import { api } from '../../services/api'

const { init } = useToast()

const files = ref<File[]>([])
const isUploadDisabled = ref(false)
const headers = { 'Content-Type': 'multipart/form-data' }
// 分片上传
let chunkSize = 1024 * 1024 * 5
const hash = ref<string>('')
const speep = ref<number>(0)
const percent = ref<number>(0)

// 回传父组件
const emits = defineEmits(['afterUpload'])

const reset = () => {
  files.value.length = 0
  isUploadDisabled.value = false
}

const upload = async (files: File[]) => {
  const file = files[0] as File
  // isUploading.value = true
  isUploadDisabled.value = true

  if (1024 * 1024 * 1024 < file.size) {
    init({ message: '文件大小不得超过1GB!', color: 'danger' })
    reset()
    return
  }
  hash.value = (await getFileMD5(file)) as string
  // 查询已上传分片
  api
    .post('/api/slice/query', { condition: { hash: hash.value }, limit: 0 })
    .then((slices) => filterUploadedSlice(slices as FileSlice[]))
    .then((slices) => uploadSlice(slices))
    .then(() => mergeSlices())
    .catch(() => reset())
}

// 查询已上传的切片
const filterUploadedSlice = (uploadedSlices: FileSlice[]) => {
  const uploadSliceIndexs = uploadedSlices.map((item: { chunkIndex: any }) => item.chunkIndex)
  // 当前文件大小
  const file = files.value[0]
  const fileSize = file.size
  // 当前文件分割多少份 （chunkSize 多少大小分割）
  let chunkTotal = Math.ceil(fileSize / chunkSize)
  if (fileSize > chunkSize * 40) {
    chunkSize = chunkSize * 8
    chunkTotal = Math.ceil(fileSize / chunkSize)
  }

  // split file to slices
  const slices: FileSlice[] = []
  for (let i = 0; i < chunkTotal; i++) {
    const startPoint = i * chunkSize
    const endPoint = Math.min(startPoint + chunkSize, fileSize)
    if (uploadSliceIndexs.includes(i)) continue
    const chunk = file.slice(startPoint, endPoint)
    // 存储分片状态
    slices.push({
      file: chunk,
      chunkTotal,
      fileName: file.name,
      hash: hash.value,
      chunkIndex: i,
    })
  }
  speep.value = 100 / slices.length
  return slices
}

const uploadSlice = (slices: FileSlice[]) => {
  return Promise.all(
    slices.map((s) => {
      const { chunkTotal, chunkIndex, file, fileName, hash } = s
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filename', fileName)
      formData.append('chunkTotal', chunkTotal.toString())
      formData.append('chunkIndex', chunkIndex.toString())
      formData.append('hash', hash)
      return api
        .post('/api/slice/upload', formData, headers)
        .then(() => (percent.value = Math.min(100, percent.value + speep.value)))
    }),
  )
}

// 文件切片上传
const mergeSlices = async () => {
  return api.post('/api/slice/merge', { hash: hash.value }).then((res) => {
    init({ message: '文件上传成功!', color: 'success' })
    emits('afterUpload', res)
  })
}
</script>

<style scoped>
.progress-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  /* 使容器高度为视口高度 */
}
</style>
