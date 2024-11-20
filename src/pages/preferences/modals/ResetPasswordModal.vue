<template>
  <VaModal max-width="530px" :mobile-fullscreen="false" hide-default-actions model-value close-button
    @update:modelValue="emits('cancel')">
    <h1 class="va-h5 mb-4">重置密码</h1>
    <VaForm ref="form" class="space-y-6" @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VaInput v-model="oldPassowrd" :rules="oldPasswordRules" label="旧密码" placeholder="请输入旧密码" required-mark
          type="password" />
        <div class="hidden md:block" />
        <VaInput v-model="newPassword" :rules="newPasswordRules" label="新密码" placeholder="请输入新密码" required-mark
          type="password" />
        <VaInput v-model="repeatNewPassword" :rules="repeatNewPasswordRules" label="重复密码" placeholder="请再次输入新密码"
          required-mark type="password" />
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon :name="newPassword?.length! >= 8 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>必须至少8个字符长</p>
        </div>
        <div class="flex space-x-2 items-center">
          <div>
            <VaIcon :name="new Set(newPassword).size >= 6 ? 'mso-check' : 'mso-close'" color="secondary" size="20px" />
          </div>
          <p>必须包含至少6个唯一字符</p>
        </div>
      </div>
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')"> 取消</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" @click="submit"> 保存</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import { buttonStyles } from '../styles'
import { useUserStore } from '../../../stores/user-store'
import axios from 'axios'

const store = useUserStore()
const oldPassowrd = ref<string>()
const newPassword = ref<string>("")
const repeatNewPassword = ref<string>()

const { validate } = useForm('form')
const { init } = useToast()

const emits = defineEmits(['cancel'])

const submit = async () => {
  if (!validate()) return
  store.user.password = newPassword.value
  const result = await axios.post('/api/user/update', store.user)
  if (0 < result.data.code) {
    init({ message: result.data.msg, color: 'danger' })
    return
  }

  init({ message: "您已成功更改密码", color: 'success' })
  emits('cancel')
}

const oldPasswordRules = [
  (v: string) => !!v || '必须输入旧密码',
  (v: string) => v !== store.user.password || '旧密码错误',
]

const newPasswordRules = [
  (v: string) => !!v || '必须输入新密码',
  (v: string) => v?.length >= 8 || '必须至少8个字符长',
  (v: string) => new Set(v).size >= 6 || '必须包含至少6个唯一字符',
  (v: string) => v !== oldPassowrd.value || '新密码不能重复',
]

const repeatNewPasswordRules = [
  (v: string) => !!v || '必须输入重复密码',
  (v: string) => v === newPassword.value || '重复密码与新密码不匹配',
]
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>
