<template>
    <VaFileUpload v-model="files" dropzone file-types="json" :disabled="isUploadDisabled" @file-added="upload" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, defineEmits } from 'vue';
import { useToast } from 'vuestic-ui'

import { FileSlice, getFileMD5 } from '../../services/fileutils'

const { init } = useToast();

// const files = ref([])
const isUploadDisabled = ref(false)
const headers = { 'Content-Type': 'multipart/form-data' };

// 分片上传
let chunkSize = 1024 * 1024 * 5
const files = ref<File[]>([])
const slices = ref<FileSlice[]>([])

// 回传父组件
const emits = defineEmits(["afterUpload"])

const reset = () => {
    files.value.length = 0
    isUploadDisabled.value = false
}

const upload = async (file: File[]) => {
    isUploadDisabled.value = true
    const hash = await getFileMD5(file[0])
    // check hash in server
    const respHash = await axios.post('/api/file/query', { condition: { hash: hash } }).catch((err) => {
        init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
        return reset()
    })
    if (0 < respHash?.data.code) {
        init({ message: "文件上传失败：" + respHash?.data.msg, color: 'danger' })
        return reset()
    }

    if (0 == respHash?.data.data.length) {
        const formData = new FormData()
        formData.append('file', file[0])
        formData.append('hash', hash)
        const resp = await axios.post('/api/file/upload', formData, { headers: headers }).catch((err) => {
            init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
            console.log(err)
        })
        return emits("afterUpload", resp?.data.data)
    }

    // to detect log file
    return emits("afterUpload", respHash?.data.data[0])
}

</script>