<template>
  <VaDataTable :items="items" :columns="columns">
    <template #cell(timestamp)="{ value }">
      {{ formatTimestamp(value) }}
    </template>
  </VaDataTable>
</template>

<script>
import { defineComponent } from 'vue'
import { parseTime } from '../../services/time.js'
import riskDb from '../../data/pages/risk-db.json'

export default defineComponent({
  data() {
    const items = riskDb

    const columns = [
      { key: 'pid', label: 'PID', sortable: true },
      { key: 'pname', label: '进程', sortable: true },
      { key: 'event', label: '事件', sortable: true },
      { key: 'object', label: '对象' },
      { key: 'timestamp', label: '时间', sortable: true },
    ]

    return {
      items,
      columns,
    }
  },
  methods: {
    formatTimestamp(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
    },
  },
})
</script>
