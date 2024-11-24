<template>
    <VaFileUpload v-model="files" dropzone file-types="json" :disabled="isUploadDisabled" @file-added="upload" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, defineEmits } from 'vue';
import { useToast } from 'vuestic-ui'

import { NewFileType, FileSlice, getFileMD5 } from '../../services/fileutils'

const { init } = useToast();

const files = ref<File[]>([])
const isUploadDisabled = ref(false)
const headers = { 'Content-Type': 'multipart/form-data' };

// 分片上传
let chunkSize = 1024 * 1024 * 5
const slices = ref<FileSlice[]>([])
const promises: unknown[] = []

// 回传父组件
const emits = defineEmits(["afterUpload"])

const reset = () => {
    files.value.length = 0
    isUploadDisabled.value = false
}

const upload = async (files: File[]) => {
    const file = files[0] as NewFileType
    isUploadDisabled.value = true
    const hash = await getFileMD5(file) as string

    file.state = {
        state_txt: 'load',
        tips_txt: '处理中,请稍后'
    }
    file.hash = hash
    file.progress = 0
    file.speep = 0

    // 文件切片处理及跳过已上传分片
    await queryUploadSlice(file, hash)
    if (slices.length == 0) {
        file.state = {
            state_txt: 'success',
            tips_txt: '上传成功！'
        }
        file.progress = 100
        return
    }

    // 循环调用切片上传
    file.state.tips_txt = '上传中，请稍后'
    for (const slice of slices.value) {
        fileSliceUploadHandle(slice)
    }

    await Promise.all(promises).then(() => {
        // 合并文件

        init({ message: "文件上传成功!", color: 'success' })
    }).catch((err) => {
        console.log(err)
        init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
        reset()
    })

    // 合并文件
    await mergeSlices(hash)
    return;
    const respHash = await axios.post('/api/file/query', { condition: { hash: hash } }).catch(() => {
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
            const file = files.value[0] as NewFileType
            file.speep = 100 / Number(chunkTotal)
            file.progress += file.speep
            if (file.progress > 100) {
                file.progress = 100
            }
            if (Math.ceil(file.progress) >= 100) {
                file.state = {
                    state_txt: 'success',
                    tips_txt: '上传成功！'
                }
            }
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
    await axios.post('/api/slice/merge', {hash:hash})
        .then((res) => {
            if (0 < res.data.code) {
                init({ message: "文件合并失败：" + res.data.msg, color: 'danger' })
                return reset()
            }
            return emits("afterUpload", res?.data.data)
        })
        .catch((err) => {
            console.log(err)
            init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
            reset()
        })
}
</script>