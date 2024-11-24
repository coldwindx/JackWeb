<template>
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
                    <td>{{ props.fileInfo.originName }}</td>
                    <td>
                        <VaButton round :color="props.result === 51 ? 'danger' : 'success'" @click="openRiskForm">{{
                            props.result === 51 ? '风险' : '安全'
                        }}</VaButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="result-confirmation">
        <div class="checkmark">✔</div>
        <div class="confirmation-text">测试结束</div>
        <div class="confirmation-subtext">该数据被判定为{{ props.result == 51 ? '风险' : '安全' }}数据</div>
        <button class="retest-button" @click="reset">重新测试</button>
    </div>

    <VaModal v-model="isRiskFormOpen" size="large" mobile-fullscreen close-button hide-default-actions>
        <h1 class="va-h5">风险数据</h1>
        <RiskForm :fileId="props.fileInfo.id" />
    </VaModal>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import RiskForm from './RiskForm.vue'

const props = defineProps({ fileInfo: {}, result: 50 })
const emits = defineEmits(["reset"])
const isRiskFormOpen = ref(false)

const openRiskForm = () => { isRiskFormOpen.value = true }
const reset = () => { emits("reset") }
</script>

<style>
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