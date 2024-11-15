<template>
    <h1 class="page-title">勒索检测</h1>

    <div class="container">
        <div class="steps">
            <div :class="['step', { completed: currentStep >= 1 }]" @click="setStep(1)">
                <div class="circle">1</div>
                <div class="label">步骤1<br />开始检测数据</div>
            </div>
            <div :class="['step', { completed: currentStep >= 2 }]" @click="setStep(2)">
                <div class="circle">2</div>
                <div class="label">步骤2<br />多源数据整合</div>
            </div>
            <div :class="['step', { completed: currentStep >= 3 }]" @click="setStep(3)">
                <div class="circle">3</div>
                <div class="label">步骤3<br />勒索攻击检测</div>
            </div>
            <div :class="['step', { completed: currentStep >= 4 }]" @click="setStep(4)">
                <div class="circle">4</div>
                <div class="label">步骤4<br />获取结果并展示</div>
            </div>
        </div>

        <div v-if="currentStep === 1" class="step-content">
            <h3>步骤1: 开始检测数据</h3>
            <p>请选择并开始检测数据...</p>
            <VaFileUpload v-model="files" dropzone file-types="json" @file-added="upload()" />
        </div>

        <div v-if="currentStep === 2" class="step-content">
            <h3>步骤2: 多源数据整合</h3>
            <p>正在整合多源数据...</p>
        </div>

        <div v-if="currentStep === 3" class="step-content">
            <h3>步骤3: 勒索攻击检测</h3>
            <p>正在检测勒索攻击...</p>
        </div>

        <div v-if="currentStep === 4" class="step-content">
            <h3>步骤4: 获取结果并展示</h3>
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
                            <td>kd5fee0c6f1d0d730de259c64e6373a0c_test_1</td>
                            <td>
                                <VaButton round color="danger" @click="openRiskForm">风险</VaButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="result-confirmation">
                <div class="checkmark">✔</div>
                <div class="confirmation-text">测试结束</div>
                <div class="confirmation-subtext">该数据被判定为风险数据</div>
                <button class="retest-button" @click="retest">重新测试</button>
            </div>
        </div>
    </div>

    <VaModal v-model="isRiskFormOpen" size="large" mobile-fullscreen close-button hide-default-actions>
        <h1 class="va-h5">风险数据</h1>
        <RiskForm />
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
            result: 0,
            isRiskFormOpen: false,
            currentStep: 4,
            files: []
        }
    },
    methods: {
        retest() {
            this.currentStep = 1
        },
        setStep(step) {
            this.currentStep = step
        },
        openRiskForm() {
            this.isRiskFormOpen = true
        },
        async upload() {

            let formData = new FormData();
            formData.append('file', this.files[0])

            try {
                let resp = await axios.post('/api/upload', formData, { headers: headers });
                // upload failure
                if(0 < resp.data.code){
                    console.error('uploading file fail:', resp.msg);
                    return;
                }
                this.currentStep = 2
            } catch (error) {
                console.error('Error uploading file:', error);
            }
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
  