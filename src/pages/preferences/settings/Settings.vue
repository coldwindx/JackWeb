<template>
  <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">昵称</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.userName }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openNameModal')">
      编辑
    </VaButton>
  </div>
  <div class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">姓名</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.fullName }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openFullNameModal')">
      编辑
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">邮箱</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.email }}
      </div>
    </div>
  </div>
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">密码</p>
    <div class="flex-1">
      <div class="max-w-[748px]">•••••••••••••</div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" @click="emits('openResetPasswordModal')">
      重置密码
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">双因素身份验证</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ twoFA.content }}
      </div>
    </div>
    <VaButton :style="buttonStyles" class="w-fit h-fit" preset="primary" :color="twoFA.color" @click="toggle2FA">
      {{ twoFA.button }}
    </VaButton>
  </div>
  <VaDivider />
  <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5">
    <p class="font-bold w-[200px]">电子邮件订阅</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        <p>管理你的电子邮件,访问</p>
        <div class="flex space-x-1 w-fit">
          <RouterLink :to="{ name: 'settings' }" class="font-semibold text-primary">通知设置</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import { useToast } from 'vuestic-ui'

import { useUserStore } from '../../../stores/user-store'

import { buttonStyles } from '../styles'

const store = useUserStore()

const { init } = useToast()

const toastMessage = computed(() => (store.is2FAEnabled ? '双因素身份验证已开启' : '双因素身份验证已关闭'))

const twoFA = computed(() => {
  if (store.is2FAEnabled) {
    return {
      color: 'danger',
      button: '关闭',
      content: '您的账户现在启用了双重身份验证（2FA），这将为您的登录添加额外的安全验证。',
    }
  } else {
    return {
      color: 'primary',
      button: '开启',
      content: '你的帐户添加了一个额外的安全验证。登录时，您需要提供除用户名和密码外的验证码。',
    }
  }
})

const toggle2FA = () => {
  store.toggle2FA()
  init({ message: toastMessage.value, color: 'success' })
}

const emits = defineEmits(['openNameModal', 'openFullNameModal', 'openResetPasswordModal'])
</script>
