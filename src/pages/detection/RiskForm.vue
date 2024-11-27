<template>
  <VaDataTable :items="risks" :columns="columns">
    <template #cell(timestamp)="{ value }">
      {{ formatTimestamp(value) }}
    </template>
  </VaDataTable>
  <VaPagination
    v-model="currentPage"
    class="mb-3 justify-center sm:justify-content-end"
    :pages="totalPage"
    input
    buttons-preset="default"
  />
</template>

<script setup>
import axios from 'axios'
import { parseTime } from '../../services/time.js'
import { defineProps, ref, onMounted, watch } from 'vue'
import { useToast } from 'vuestic-ui'

const { init } = useToast()

// 在组件挂载时调用查询函数
const risks = ref([])
onMounted(async () => {
  totalPage.value = Math.ceil((await count()) / perPage.value)
  risks.value = await query()
})

const columns = [
  { key: 'pid', label: 'PID', sortable: true },
  { key: 'pname', label: '进程', sortable: true },
  { key: 'eventname', label: '事件', sortable: true },
  { key: 'obj', label: '对象' },
  { key: 'timestamp', label: '时间', sortable: true },
]
// 分页定义
const currentPage = ref(1)
const totalPage = ref(1)
const perPage = ref(10)

watch(
  currentPage,
  async () => {
    risks.value = await query()
  },
  { immediate: true },
)
// 定义 Props
const props = defineProps({ fileId: { type: Number, default: 0 } })

const formatTimestamp = (time) => {
  const EPOCH_AS_FILETIME = 11644473600 * 10000000
  return parseTime((time - EPOCH_AS_FILETIME) / 10000, '{y}-{m}-{d} {h}:{i}:{s}')
}

const count = async () => {
  const resp = await axios.post('/api/risk/count', { condition: { fileId: props.fileId } })
  if (0 < resp.data.code) {
    init({ message: resp.data.msg, color: 'danger' })
    return []
  }
  return resp.data.data
}
const query = async () => {
  const resp = await axios.post('/api/risk/query', {
    condition: { fileId: props.fileId },
    limit: perPage.value,
    offset: perPage.value * (currentPage.value - 1),
  })
  if (0 < resp.data.code) {
    init({ message: resp.data.msg, color: 'danger' })
    return []
  }
  return resp.data.data
}
</script>
