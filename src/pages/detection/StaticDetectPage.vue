<template>
  <h1 class="page-title">勒索检测</h1>

  <div class="container">
    <div class="steps">
      <div :class="['step', { completed: currentStep >= 1 }]">
        <div class="circle">1</div>
        <div class="label">步骤1<br />开始检测数据</div>
      </div>
      <div :class="['step', { completed: currentStep >= 2 }]">
        <div class="circle">2</div>
        <div class="label">步骤2<br />勒索攻击检测</div>
      </div>
      <div :class="['step', { completed: currentStep >= 3 }]">
        <div class="circle">3</div>
        <div class="label">步骤3<br />获取结果并展示</div>
      </div>
    </div>

    <div v-if="currentStep === 1" class="step-content">
      <h3>步骤1: 开始检测数据</h3>
      <p>请选择并开始检测数据...</p>
      <FileUpload @afterUpload="afterUpload" />
    </div>

    <div v-if="currentStep === 2" class="step-content">
      <h3>步骤2: 勒索攻击检测</h3>
      <p>正在检测勒索攻击，请勿离开...</p>
    </div>

    <div v-if="currentStep === 3" class="step-content">
      <h3>步骤3: 获取结果并展示</h3>
      <DetectResult :fileInfo="fileInfo" :result="result" @reset="retest"/>
    </div>
  </div>
</template>

<script>
import FileUpload from './FileUpload.vue'
import DetectResult from './DetectResult.vue'

import axios from 'axios'
import { useToast } from 'vuestic-ui'

const { init } = useToast()
const headers = { 'Content-Type': 'multipart/form-data' }

export default {
  name: 'DetectionPage',
  components: {
    FileUpload,
    DetectResult
  },
  data() {
    return {
      currentStep: 1,
      files: [],
      fileInfo: {
        id: 9,
        originName: "sample.json",
        savePath: "/tmp/tomcat-docbase.8001.13598271940526089678/a2cf19d6-f5c0-41e4-be4d-27a48603d282.json",
        uploadTime: 926857281504258
      },
      result: 20
    }
  },
  methods: {
    retest() {
      this.files.length = 0
      this.currentStep = 1
    },
    async afterUpload(fileInfo) {
      this.fileInfo = fileInfo
      this.currentStep = 2

      const respDetect = await axios.post('/api/detect/static_detect', { fileId: this.fileInfo.id }, { headers: headers })
      if (0 < respDetect.data.code) {
        init({ message: "文件检测失败：" + respDetect.data.msg, color: 'danger' })
        return this.retest()
      }

      this.result = respDetect.data.data
      this.currentStep = 3
    }
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.step {
  text-align: center;
  width: 23%;
  cursor: pointer;
}

.step .circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ddd;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.step.completed .circle {
  background-color: #4caf50;
}

.step .label {
  font-size: 14px;
}

.step-content {
  margin-bottom: 20px;
}
</style>
