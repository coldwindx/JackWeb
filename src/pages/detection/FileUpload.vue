<template>
    <VaFileUpload v-model="files" dropzone file-types="json" :disabled="isUploadDisabled" @file-added="upload"/>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useToast } from 'vuestic-ui'

const { init } = useToast();

const files = ref([])
const isUploadDisabled = ref(false)
const fileInfo = ref({})
const headers = { 'Content-Type': 'multipart/form-data' };

// 回传父组件
const emits = defineEmits(["afterUpload"])

const reset = ()=>{
    files.value.length = 0
    isUploadDisabled.value = false
}
const upload = async () => {
    isUploadDisabled.value = true
    const formData = new FormData()
    formData.append('file', files.value[0])

    const resp = await axios.post('/api/file/upload', formData, { headers: headers }).catch((err)=>{
        init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' })
        console.log(err)
    })
    if (0 < resp.data.code) {
        init({ message: "文件上传失败：" + resp.data.msg, color: 'danger' })
        reset()
        return;
    }

    fileInfo.value = resp.data.data
    emits("afterUpload", fileInfo.value)
}
</script>