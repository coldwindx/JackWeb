<template>
  <VaForm ref="passwordForm" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">忘记密码?</h1>
    <p class="text-base mb-4 leading-5">
      如果你忘记了密码，别担心。只需在下面输入您的电子邮件地址，我们就会给您发送电子邮件使用临时密码。恢复访问您的帐户从未如此简单。
    </p>
    <VaInput v-model="email" :rules="[(v) => !!v || '请输入[邮箱]']" class="mb-4" label="邮箱" type="email" />
    <VaButton class="w-full mb-2" @click="submit">发送密码</VaButton>
    <VaButton :to="{ name: 'login' }" class="w-full" preset="secondary" @click="submit">返回登录页面</VaButton>
  </VaForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from 'vuestic-ui'
import { useRouter } from 'vue-router'

const email = ref('')
const form = useForm('passwordForm')
const router = useRouter()

const submit = () => {
  if (form.validate()) {
    router.push({ name: 'recover-password-email' })
  }
}
</script>
