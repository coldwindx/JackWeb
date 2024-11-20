<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">TI-TRANS勒索攻击检测系统</h1>
    <p class="text-base mb-4 leading-5">
      没有账号？
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">注册</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="邮箱"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
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

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="保持登录" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        忘记密码?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">登录</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import axios from 'axios'
// 引入pinia仓库
import { useUserStore } from '../../stores/user-store'
import { User } from '../../entity/user'
const userStore = useUserStore()

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: 'x15562957611@163.com',
  password: '4566598',
  keepLoggedIn: false,
})

const submit = async () => {
  if (!validate()) return

  const result = await axios.post('/api/user/login', formData)
  if (0 < result.data.code) {
    init({ message: result.data.msg, color: 'danger' })
    return
  }

  init({ message: '登录成功！', color: 'success' })

  // Log logined user
  const currentUser = result.data.data
  const user: User = {
    id: currentUser.id,
    fullname: currentUser.fullname,
    password: currentUser.password,
    email: currentUser.email,
    username: currentUser.username,
    roles: currentUser.roles,
    avatar: currentUser.avatar,
    activate: currentUser.activate,
  }
  console.log(user)
  userStore.setUser(user)
  push({ name: 'dashboard' })
}
</script>
