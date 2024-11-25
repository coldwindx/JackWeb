<template>
    <VaFileUpload v-model="files" dropzone file-types="json" :disabled="isUploadDisabled" @file-added="upload" />
    <div class="progress-container" v-if="isUploadDisabled">
        <VaProgressBar :model-value="percent" size="large" content-inside show-percent style="width: 80%;"/>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, defineEmits } from 'vue';
import { useToast } from 'vuestic-ui'

import { FileSlice, getFileMD5 } from '../../services/fileutils'

const { init } = useToast();

const files = ref<File[]>([])
const isUploadDisabled = ref(false)
const headers = { 'Content-Type': 'multipart/form-data' };

// 分片上传
let chunkSize = 1024 * 1024 * 5
const slices = ref<FileSlice[]>([])
const promises: unknown[] = []
const speep = ref<number>(0)
const percent = ref<number>(0)


// 回传父组件
const emits = defineEmits(["afterUpload"])

const reset = () => {
    files.value.length = 0
    isUploadDisabled.value = false
    slices.value.length = 0
    promises.length = 0
}

const upload = async (files: File[]) => {
    const file = files[0] as File
    isUploadDisabled.value = true

    if (1024 * 1024 * 1024 < file.size) {
        init({ message: "文件大小不得超过1GB!", color: 'danger' })
        reset()
        return;
    }
    const hash = await getFileMD5(file) as string

    // 文件切片处理及跳过已上传分片
    await queryUploadSlice(file, hash)
    if (slices.length == 0) {
        percent.value = 100
        return
    }

    // 循环调用切片上传
    speep.value = 100 / slices.value.length
    for (const slice of slices.value) {
        fileSliceUploadHandle(slice)
    }

    await Promise.all(promises).then(async () => {
        // 合并文件
        await mergeSlices(hash)
    }).catch((err) => {
        console.log(err)
        init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
        reset()
    })
}

// 查询已上传的切片
const queryUploadSlice = async (file: File, hash: string) => {
    await axios.post('/api/slice/query', { condition: { hash: hash }, limit: 0 })
        .then((res) => {
            if (0 < res.data.code) {
                init({ message: "文件上传失败：" + res.data.msg, color: 'danger' })
                return reset()
            }
            let uploadSliceIndexs = res.data.data.map((item: { chunkIndex: any; }) => item.chunkIndex);
            // 当前文件大小
            const fileSize = file.size
            // 当前文件分割多少份 （chunkSize 多少大小分割）
            let chunkTotal = Math.ceil(fileSize / chunkSize)
            if (fileSize > chunkSize * 40) {
                chunkSize = chunkSize * 8
                chunkTotal = Math.ceil(fileSize / chunkSize)
            }

            // split file to slices
            for (let i = 0; i < chunkTotal; i++) {
                const startPoint = i * chunkSize
                const endPoint = Math.min(startPoint + chunkSize, fileSize)
                if (uploadSliceIndexs.includes(i))
                    continue;
                const chunk = file.slice(startPoint, endPoint)
                // 存储分片状态
                slices.value.push({
                    file: chunk,
                    chunkTotal,
                    fileName: file.name,
                    hash,
                    chunkIndex: i
                })
            }
        })
        .catch((err) => {
            console.log(err)
            init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
            reset()
        })
}

// 文件切片上传
const fileSliceUploadHandle = (fileChunk: FileSlice) => {
    const { chunkTotal, chunkIndex, file, fileName, hash } = fileChunk

    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', fileName)
    formData.append('chunkTotal', chunkTotal)
    formData.append('chunkIndex', chunkIndex)
    formData.append('hash', hash)

    const promise = new Promise((resolve, reject) => {
        axios.post("/api/slice/upload", formData, { headers: headers }).then(res => {
            if (0 < res.data.code) {
                init({ message: "文件上传失败：" + res.data.msg, color: 'danger' })
                return reset()
            }
            percent.value = Math.min(100, percent.value + speep.value)
            return resolve(true)
        }).catch((err) => {
            console.log(err)
            init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
            reset()
        })
    })
    promises.push(promise)
}

const mergeSlices = async (hash: string) => {
    await axios.post('/api/slice/merge', { hash: hash })
        .then((res) => {
            if (0 < res.data.code) {
                init({ message: "文件合并失败：" + res.data.msg, color: 'danger' })
                return reset()
            }
            init({ message: "文件上传成功!", color: 'success' })
            return emits("afterUpload", res?.data.data)
        })
        .catch((err) => {
            console.log(err)
            init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
            reset()
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