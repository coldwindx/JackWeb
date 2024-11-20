<template>
  <VaDataTable :items="risks" :columns="columns">
    <template #cell(timestamp)="{ value }">
      {{ formatTimestamp(value) }}
    </template>
  </VaDataTable>
</template>

<script>
import { defineComponent } from 'vue'
import { parseTime } from '../../services/time.js'

const columns = [
  { key: 'pid', label: 'PID', sortable: true },
  { key: 'pname', label: '进程', sortable: true },
  { key: 'eventname', label: '事件', sortable: true },
  { key: 'obj', label: '对象' },
  { key: 'timestamp', label: '时间', sortable: true },
]
export default defineComponent({
  props: {
    risks: [],
  },
  methods: {
    formatTimestamp(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
    },
  },
})
</script>
