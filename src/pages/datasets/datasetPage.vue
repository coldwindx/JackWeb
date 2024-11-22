<template>
  <h1 class="page-title font-bold">数据收集</h1>

  <div class="header">
    <VaButton class="block" color="success" @click="add"> 新增 </VaButton>
    <VaButton class="block" color="danger" @click="remove"> 删除 </VaButton>
    <VaInput v-model="query" class="block" placeholder="Search" style="width: 30%" />
    <VaButton class="block" @click="search"> 搜索 </VaButton>
  </div>

  <DataForm />
</template>

<script setup>
import DataForm from './DatasetForm.vue'

</script>

<style>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.block {
  margin-right: 10px;
  padding: 3px 10px;
}
</style>
