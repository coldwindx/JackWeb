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
            <VaFileUpload v-model="files" dropzone file-types="json" @file-added="upload()" :disabled="isUploadDisabled" />
        </div>

        <div v-if="currentStep === 2" class="step-content">
            <h3>步骤2: 勒索攻击检测</h3>
            <p>正在检测勒索攻击，请勿离开...</p>
        </div>

        <div v-if="currentStep === 3" class="step-content">
            <h3>步骤3: 获取结果并展示</h3>
            <div class="result-data">
                <h3>测试数据</h3>
                <table>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>结果</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{files[0].name}}</td>
                            <td>
                                <VaButton round :color="result ? 'danger' : 'success'" @click="openRiskForm">{{result ? "风险" : "安全"}}</VaButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="result-confirmation">
                <div class="checkmark">✔</div>
                <div class="confirmation-text">测试结束</div>
                <div class="confirmation-subtext">该数据被判定为{{result ? "风险" : "安全"}}数据</div>
                <button class="retest-button" @click="retest">重新测试</button>
            </div>
        </div>
    </div>

    <VaModal v-model="isRiskFormOpen" size="large" mobile-fullscreen close-button hide-default-actions>
        <h1 class="va-h5">风险数据</h1>
        <RiskForm :risks="risks"/>
    </VaModal>
</template>
  
<script>
import DatasetForm from './DatasetForm.vue'
import RiskForm from './RiskForm.vue'
import axios from 'axios'

const headers = { 'Content-Type': 'multipart/form-data' }

export default {
    name: 'DetectionPage',
    components: {
        DatasetForm,
        RiskForm,
    },
    data() {
        return {
            isRiskFormOpen: false,
            currentStep: 1,
            files: [],
            result: 0,
            risks: [],
            isUploadDisabled: false,
        }
    },
    methods: {
        retest() {
            this.files.length = 0;
            this.risks.length = 0;
            this.currentStep = 1;
        },
        openRiskForm() {
            if(0 == this.result)
                return
            this.isRiskFormOpen = true
        },
        async upload() {
            this.isUploadDisabled = true;
            let formData = new FormData();
            formData.append('file', this.files[0])

            let resp1 = await axios.post('/api/upload', formData, { headers: headers });
            // upload failure
            if(0 < resp1.data.code){
                console.error('uploading file fail:', resp1.msg);
                this.files.clear();
                this.isUploadDisabled = false;
                return;
            }

            this.currentStep = 2
            let resp2 = await axios.post('/api/detect', {"filename": resp1.data.data["file-path"]}, { headers: headers });
            if(0 < resp2.data.code){
                console.error('detecting file fail:', resp2.msg);
                this.files.clear();
                this.isUploadDisabled = false;
                this.currentStep = 1;
                return;
            }
            
            this.risks = resp2.data.data;
            this.result = 0 < this.risks.length ? 1 : 0;
            this.currentStep = 3
            this.isUploadDisabled = false;
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

.result-data {
    margin-bottom: 20px;
}

.result-data h3 {
    margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

thead {
    background-color: #e0e0e0;
}

th,
td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.label-malicious {
    color: red;
}

.result-confirmation {
    text-align: center;
}

.checkmark {
    font-size: 50px;
    color: green;
    margin-bottom: 10px;
}

.confirmation-text {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.confirmation-subtext {
    font-size: 16px;
    color: #777;
    margin-bottom: 20px;
}

.retest-button {
    padding: 10px 20px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
  