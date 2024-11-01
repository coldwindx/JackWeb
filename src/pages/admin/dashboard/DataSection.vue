<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <DataSectionItem
      v-for="metric in dashboardMetrics"
      :key="metric.id"
      :title="metric.title"
      :value="metric.value"
      :change-text="metric.changeText"
      :up="metric.changeDirection === 'up'"
      :icon-background="metric.iconBackground"
      :icon-color="metric.iconColor"
    >
      <template #icon>
        <VaIcon :name="metric.icon" size="large" />
      </template>
    </DataSectionItem>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'
import DataSectionItem from './DataSectionItem.vue'

interface DashboardMetric {
  id: string
  title: string
  value: string
  icon: string
  changeText: string
  changeDirection: 'up' | 'down'
  iconBackground: string
  iconColor: string
}

const { getColor } = useColors()

const dashboardMetrics = computed<DashboardMetric[]>(() => [
  {
    id: 'ransomwares',
    title: '勒索数量',
    value: '17',
    icon: 'mso-error',
    changeText: '13%',
    changeDirection: 'down',
    iconBackground: getColor('danger'),
    iconColor: getColor('on-danger'),
  },
  {
    id: 'underDetection',
    title: '检测次数',
    value: '21',
    icon: 'mso-folder_open',
    changeText: '25.36%',
    changeDirection: 'up',
    iconBackground: getColor('info'),
    iconColor: getColor('on-info'),
  },
  {
    id: 'users',
    title: '注册账户',
    value: '25',
    icon: 'mso-account_circle',
    changeText: '2.5%',
    changeDirection: 'up',
    iconBackground: getColor('success'),
    iconColor: getColor('on-success'),
  },
  {
    id: 'logins',
    title: '登录次数',
    value: '27%',
    icon: 'mso-grade',
    changeText: '4%',
    changeDirection: 'up',
    iconBackground: getColor('warning'),
    iconColor: getColor('on-warning'),
  },
])
</script>
