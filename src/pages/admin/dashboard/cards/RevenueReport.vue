<template>
  <VaCard class="flex flex-col">
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">系统状况</h1>
      <div class="flex gap-2">
        <VaSelect v-model="selectedMonth" preset="small" :options="monthsWithCurrentYear" class="w-24" />
      </div>
    </VaCardTitle>
    <VaCardContent class="flex flex-col-reverse md:flex-row md:items-center justify-between gap-5 h-full">
      <section class="flex flex-col items-start w-full sm:w-1/3 md:w-2/5 lg:w-1/4 gap-2 md:gap-8 pl-4">
        <div>
          <p class="text-xl font-semibold">{{ statistics.currentOnlinePopulation }}</p>
          <p class="whitespace-nowrap mt-2">当前在线人数</p>
        </div>
        <div class="flex flex-col sm:flex-col gap-2 md:gap-8 w-full">
          <div>
            <div class="flex items-center">
              <span class="inline-block w-2 h-2 mr-2 -ml-4" :style="{ backgroundColor: earningsColor }"></span>
              <span class="text-secondary">本月登录次数</span>
            </div>
            <div class="mt-2 text-xl font-semibold">{{ statistics.loginThisMonth }}</div>
          </div>
          <div>
            <div class="flex items-center">
              <span class="inline-block w-2 h-2 mr-2 -ml-4" :style="{ backgroundColor: expensesColor }"></span>
              <span class="text-secondary">本月检测次数</span>
            </div>
            <div class="mt-2 text-xl font-semibold">{{ statistics.detectionThisMonth }}</div>
          </div>
        </div>
      </section>
      <RevenueReportChart class="w-2/3 md:w-3/5 lg:w-3/4 h-full min-h-72 sm:min-h-32 pt-4" :revenues="revenues"
        :months="months" />
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VaCard } from 'vuestic-ui'
import RevenueReportChart from './RevenueReportChart.vue'
import {
  earningsColor,
  expensesColor,
  months,
  generateRevenues,
} from '../../../../data/charts/revenueChartData'

const revenues = generateRevenues(months)

const currentYear = new Date().getFullYear()
const monthsWithCurrentYear = months.map((month) => `${month} ${currentYear}`)

const selectedMonth = ref(monthsWithCurrentYear[0])

const statistics = ref({
  currentOnlinePopulation: 1,
  loginThisMonth: 124,
  detectionThisMonth: 232,
})

</script>
