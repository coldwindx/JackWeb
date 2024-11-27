<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">注册</h1>
    <p class="text-base mb-4 leading-5">
      已有账号？
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">登录</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[(v) => !!v || 'Email field is required', (v) => /.+@.+\..+/.test(v) || 'Email should be valid']"
      class="mb-4"
      label="邮箱"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
        messages="密码长度为8个字符以上，包含字母、数字和特殊字符。"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[(v) => !!v || '请输入[重复密码]', (v) => v === formData.password || '用户名或密码错误']"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="重复密码"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">创建</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import axios from 'axios'

import { useUserStore } from '../../stores/user-store'
import { User } from '../../entity/user'
const userStore = useUserStore()

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
})

const submit = async () => {
  if (!validate()) return
  const user: User = {
    id: 0,
    fullname: '',
    password: formData.password,
    email: formData.email,
    username: '',
    roles: 0,
    avatar: '',
    activate: 1,
  }
  const result = await axios.post('/api/user/insert', user)
  if (0 < result.data.code) {
    init({ message: result.data.msg, color: 'danger' })
    return
  }
  init({ message: '注册成功', color: 'success' })

  // Log logined user
  const currentUser = result.data.data
  // user.id = currentUser.id
  userStore.setUser(currentUser)
  push({ name: 'dashboard' })
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || '请输入[重复密码]',
  (v) => (v && v.length >= 8) || '密码长度至少为8个字符',
  (v) => (v && /[A-Za-z]/.test(v)) || '密码必须包含至少一个字母',
  (v) => (v && /\d/.test(v)) || '密码必须包含至少一个数字',
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || '密码必须包含至少一个特殊字符',
]
</script>
