<template>
  <h1 class="page-title">历史记录</h1>

  <VaDataTable :items="items" :columns="columns">
    <template #cell(status)="{ value }">
      <VaChip size="small" :color="showStatusColor(value)">
        {{ formatStatus(value) }}
      </VaChip>
    </template>
    <template #cell(timestamp)="{ value }">
      {{ formatTimestamp(value) }}
    </template>
    <template #cell(username)="{ value }">
      <strong>{{ value }}</strong>
    </template>
  </VaDataTable>
</template>

<script>
import { defineComponent } from 'vue'
import { parseTime } from '../../services/time.js'
import historyDb from '../../data/pages/history-db.json'

export default defineComponent({
  data() {
    const items = historyDb

    const columns = [
      { key: 'id' },
      { key: 'esindex', label: '索引' },
      { key: 'username', label: '昵称' },
      { key: 'email', label: '邮箱' },
      { key: 'timestamp', label: '时间' },
      { key: 'status', name: 'status', label: '状态' },
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
    formatStatus(status) {
      if (1 == status) return '风险'
      return '安全'
    },
    showStatusColor(status) {
      if (1 == status) return 'danger'
      return 'success'
    },
  },
})
</script>
