<template>
  <h1 class="page-title">构建词表</h1>
  <VaStepper v-model="step" :steps="steps" vertical controls-hidden>
    <template #step-content-0>
      <FormDataset></FormDataset>
    </template>

    <template #step-content-1>
      <div class="flex flex-col gap-2" style="position: relative">
        <VaProgressCircle
          :model-value="process_circle_value"
          indeterminate
          color="success"
          :thickness="0.3"
          size="480px"
          class="big_progress_circle"
        >
          {{ process_circle_value + '%' }}
        </VaProgressCircle>
      </div>
    </template>
  </VaStepper>
</template>

<script setup>
import { ref } from 'vue'
import { defineVaStepperSteps } from 'vuestic-ui'
import FormDataset from '../tokenization/FormDataset.vue'

const step = ref(0)

const steps = ref(
  defineVaStepperSteps([
    {
      label: '选择数据集',
      icon: 'store',
    },
    {
      label: '计算TF-IDF',
      icon: 'local_shipping',
    },
    { label: '拓展安全语义分词表', icon: 'done_all' },
  ]),
)

const process_circle_value = 75
</script>

<style>
.big_progress_circle {
  --va-progress-circle-position: relative;
  --va-progress-circle-font-size: 30px;
}
</style>
