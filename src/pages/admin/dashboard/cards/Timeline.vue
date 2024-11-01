<script setup lang="ts">
import VaTimelineItem from '../../../../components/va-timeline-item.vue'
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">时间线</h1>
    </VaCardTitle>
    <VaCardContent>
      <table class="mt-4">
        <tbody>
          <VaTimelineItem date="25m ago">
            <RouterLink class="va-link font-semibold" to="/users">Donald</RouterLink> 进行勒索攻击检测
          </VaTimelineItem>
          <VaTimelineItem date="1h ago">
            <RouterLink class="va-link font-semibold" to="/users">Lycy Peterson</RouterLink> 修改账号权限为管理员
          </VaTimelineItem>
          <VaTimelineItem date="2h ago">
            <RouterLink class="va-link font-semibold" to="/users">Joseph Rust</RouterLink> 注销登录
          </VaTimelineItem>
          <VaTimelineItem date="3d ago">
            <RouterLink class="va-link font-semibold" to="/users">Donald</RouterLink> 上传数据
            <RouterLink class="va-link font-semibold" to="/datasets">kdeebbea18401e8b5e83c410c6d3a8b4e</RouterLink>
          </VaTimelineItem>
          <VaTimelineItem date="Nov 14, 2023">
            <RouterLink class="va-link font-semibold" to="/users">Lycy Peterson</RouterLink> 登录系统
          </VaTimelineItem>
          <VaTimelineItem date="Nov 14, 2023">
            <RouterLink class="va-link font-semibold" to="/users">Dan Rya</RouterLink> 登录系统
          </VaTimelineItem>
        </tbody>
      </table>
    </VaCardContent>
  </VaCard>
</template>
