<template>
  <VaDataTable
    :items="items"
    :columns="columns"
    selectable
    :select-mode="multiple"
    :selected-color="primary"
    @selectionChange="selectedItemsEmitted = $event.currentSelectedItems"
  >
    <template #cell(timestamp)="{ value }">
      {{ formatTimestamp(value) }}
    </template>
  </VaDataTable>
  <VaAlert class="!mt-6" color="info" outline style="width: 80%">
    已选中:
    <VaChip class="ml-2">
      {{ selectedItemsEmitted.length }}
    </VaChip>
  </VaAlert>
</template>

<script>
import { defineComponent } from 'vue'
import { parseTime } from '../../services/time.js'
import datasetDb from '../../data/pages/dataset-db.json'

export default defineComponent({
  data() {
    const items = datasetDb
    const columns = [
      { key: 'esindex', label: '索引', sortable: true },
      { key: 'username', label: '昵称', sortable: true },
      { key: 'email', label: '邮箱' },
      { key: 'timestamp', label: '时间', sortable: true },
      { key: 'description', label: '描述' },
    ]

    return {
      items,
      columns,
      selectedItemsEmitted: [],
    }
  },
  methods: {
    formatTimestamp(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
    },
  },
})
</script>
