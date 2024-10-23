<template>
  <div>
    <h1 class="font-semibold text-4xl mb-4">检测邮箱</h1>
    <p class="text-base mb-4 leading-5">
      密码重置说明已发送至您的邮箱。请检查你的收件箱，包括垃圾邮件文件夹。如果需要帮助，请联系<span class="va-link"
        >技术支持</span
      >。
    </p>

    <div class="flex justify-center mt-4">
      <VaButton :to="{ name: 'login' }" class="w-full">返回登录页面</VaButton>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
