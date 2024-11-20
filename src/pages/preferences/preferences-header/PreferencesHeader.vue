<template>
  <VaAvatar size="large" color="warning"><span class="text-4xl"> 😍 </span></VaAvatar>
  <div class="flex flex-col justify-center">
    <h2 class="text-[28px] md:text-[32px] leading-10 font-bold">{{ store.user.fullname }}</h2>
    <div class="flex space-x-1 text-[13px] leading-4">
      <p>注册时间</p>
      <p>{{ 0 }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '../../../stores/user-store'
const store = useUserStore()
</script>
