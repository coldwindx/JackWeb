<template>
  <VaModal
    :mobile-fullscreen="false"
    size="small"
    hide-default-actions
    max-width="380px"
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">修改昵称</h1>
    <VaForm ref="form" @submit.prevent="submit">
      <VaInput v-model="Name" class="mb-4" label="昵称" placeholder="Name" />
      <div class="flex flex-col-reverse md:flex-row md:items-center md:justify-end md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')"> 取消</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" @click="submit"> 保存</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { buttonStyles } from '../styles'
import { useToast } from 'vuestic-ui'
import { useUserStore } from '../../../stores/user-store'
import axios from 'axios'

const store = useUserStore()

const { init } = useToast()

const emits = defineEmits(['cancel'])

const Name = ref<string>(store.user.username)

const submit = async () => {
  if (!Name.value || Name.value === store.user.username) {
    return emits('cancel')
  }

  store.user.username = Name.value
  const result = await axios.post('/api/user/update', store.user)
  if (0 < result.data.code) {
    init({ message: result.data.msg, color: 'danger' })
    return
  }

  init({ message: '你成功修改个人昵称', color: 'success' })
  emits('cancel')
}
</script>

<style lang="scss">
// TODO temporary before https://github.com/epicmaxco/vuestic-ui/issues/4020 fix
.va-modal__inner {
  min-width: 326px;
}
</style>
