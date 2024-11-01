<template>
  <h1 class="page-title">模型训练</h1>
  <div class="container">
    <div class="top-section">
      <div class="form-container">
        <div style="display: flex">
          <VaIcon name="display_settings" style="font-size: 30px; margin-right: 2%; color: #158de3" />
          <div style="font-size: x-large; font-weight: bold; margin-bottom: 20px">超参数设置</div>
        </div>

        <form @submit.prevent="submitForm">
          <!-- 表单输入项 -->
          <div v-for="input in formInputs" :key="input.label" class="form-group">
            <label :for="input.model" style="font-weight: bold; color: #154ec1">{{ input.label }}</label>
            <input v-model="form[input.model]" :type="input.type" :step="input.step || '1'" />
          </div>
          <div class="form-group">
            <label style="font-weight: bold; color: #154ec1">请选择数据集</label>
            <VaSelect v-model="datasets" :options="options" multiple />
          </div>

          <div class="gauge-buttons">
            <VaButton color="info" class="start-button" style="height: 30px; padding: 0 0" @click="startTraining">
              训练
            </VaButton>
            <VaButton color="danger" class="start-button" style="height: 30px; padding: 0 0" @click="stopTraining">
              停止
            </VaButton>
            <VaButton color="warning" class="stop-button" style="height: 30px; padding: 0 0" @click="resetForm">
              重置
            </VaButton>
          </div>
        </form>
      </div>

      <div class="gauge-container">
        <div style="display: flex">
          <VaIcon name="view_module" style="font-size: 30px; margin-right: 2%; color: #158de3" />
          <div style="font-size: x-large; font-weight: bold; margin-bottom: 10%">模型可视化</div>
        </div>
        <VaImage
          class="svg image-container"
          fit="cover"
          :ratio="1 / 3"
          src="../../../public/SingleChannelPredictor.pt.svg"
        />
      </div>

      <div class="training-steps-container">
        <div style="display: flex">
          <VaIcon name="account_tree" style="font-size: 30px; margin-right: 2%; color: #158de3" />
          <div style="font-size: x-large; font-weight: bold; margin-bottom: 10%">训练流程</div>
        </div>
        <ul>
          <li
            v-for="(step, index) in trainingSteps"
            :key="index"
            class="step"
            :style="{
              backgroundColor: isFinished(index) ? '#228200' : '#e6e9ef',
              color: isFinished(index) ? 'white' : 'black',
            }"
            @click="showStep(step, index)"
          >
            <VaIcon name="check_circle" :style="{ marginRight: '5%', color: isFinished(index) ? 'white' : 'black' }" />
            {{ step.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import datasetDb from '../../data/pages/dataset-db.json'
// 超参数设置
const formInputs = [
  { label: '训练轮数', model: 'epochs', type: 'number' },
  { label: '预热轮数', model: 'warmupEpochs', type: 'number' },
  { label: 'Batch大小', model: 'batchSize', type: 'number' },
  { label: '基础学习率', model: 'learningRate', type: 'number', step: '0.001' },
  { label: '权重衰减系数', model: 'weightDecay', type: 'number', step: '0.01' },
  { label: '随机数种子', model: 'seed', type: 'number' },
  { label: '模型保存', model: 'savename', type: 'string' },
]
const options = datasetDb.map((d) => d.esindex)
const datasets = ref(['kd5fee0c6f1d0d730de259c64e6373a0c'])
const form = ref({
  epochs: 10,
  warmupEpochs: 0,
  batchSize: 64,
  learningRate: 0.001,
  weightDecay: 0.05,
  seed: 0,
  savename: 'test_model.pth',
  datasets: datasets,
})

const submitForm = (form) => {
  console.log('提交表单', form)
}

const startTraining = () => {
  console.log('开始训练')
}

const stopTraining = () => {
  console.log('stopTraining')
}

const resetForm = () => {
  datasets.value = ['kd5fee0c6f1d0d730de259c64e6373a0c']
  form.value = {
    epochs: 10,
    warmupEpochs: 0,
    batchSize: 64,
    learningRate: 0.001,
    maskRatio: 0.9,
    weightDecay: 0.05,
    seed: 0,
    savename: 'test_model.pth',
    datasets: datasets,
  }
}

// 训练流程
const trainingSteps = [
  { name: 'Step 1 - 超参数预览', chartId: 'argsChart' },
  { name: 'Step 2 - 加载数据集', chartId: 'dataChart' },
  { name: 'Step 3 - 数据预处理', chartId: 'preprocessChart' },
  { name: 'Step 4 - 模型训练', chartId: 'trainingChart' },
  { name: 'Step 5 - 训练结果', chartId: 'resultChart' },
]
const finishedSteps = ref([])
const showStep = (step, index) => {
  console.log(step)
  console.log(index)
}

const isFinished = (index) => {
  return finishedSteps.value.includes(index)
}
</script>

<style>
.container {
  padding: 20px;
}

.top-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  max-height: 732px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-container {
  width: 20%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.gauge-container {
  width: 36%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: scroll;
}

.gauge-container::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.image-container {
  overflow: scroll;
  border-left: 1.5px solid #154ec1;
  border-right: 1.5px solid #154ec1;
}

.training-steps-container {
  width: 25%;
  border-right: 1.5px solid #154ec1;
  border-top: none;
  border-bottom: none;
  border-left: none;
}

.training-steps-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.training-steps-container li {
  cursor: pointer;
  font-size: medium;
  width: 90%;
  padding: 10px 30px;
  border-radius: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
</style>
