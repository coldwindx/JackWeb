<template>
  <h1 class="page-title">用户管理</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaDataTable :items="users" :columns="columns">
          <template #cell(fullname)="{ rowData }">
            <div class="flex items-center gap-2 max-w-[230px] ellipsis">
              <UserAvatar :user="rowData" size="small" />
              {{ rowData.fullname }}
            </div>
          </template>

          <template #cell(username)="{ value }">
            <div class="max-w-[120px] ellipsis">
              {{ value }}
            </div>
          </template>

          <template #cell(email)="{ value }">
            <div class="ellipsis max-w-[230px]">
              {{ value }}
            </div>
          </template>

          <!-- <template #cell(role)="{ rowData }">
              <VaBadge :text="rowData.role" :color="roleColors[rowData.role]" />
            </template> -->

          <template #cell(actions)="{ rowData }">
            <div class="flex gap-2 justify-left">
              <VaButton preset="primary" size="small" icon="mso-edit" aria-label="Edit user"
                @click="onEdit(rowData as User)" />
              <VaButton preset="primary" size="small" icon="mso-delete" color="danger" aria-label="Delete user"
                @click="onDelete(rowData as User)" />
            </div>
          </template>
        </VaDataTable>
      </div>

    </VaCardContent>
  </VaCard>


  <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
    <div>
      <b>{{ total }} results.</b>
      Results per page
      <VaSelect v-model="limit" class="!w-20" :options="[10, 20, 50, 100]" @update:model-value="changeLimit" />
    </div>

    <div class="flex">
      <VaButton preset="secondary" icon="va-arrow-left" aria-label="Previous page" :disabled="page === 0"
        @click="page--" />
      <VaPagination v-model="page" buttons-preset="secondary" :pages="total" :visible-pages="5" :boundary-links="false"
        :direction-links="false" />
      <VaButton class="mr-2" preset="secondary" icon="va-arrow-right" aria-label="Next page"
        :disabled="page === total - 1" @click="page++" />
    </div>
  </div>

  <VaModal v-slot="{ cancel, ok }" v-model="isShowDialog" size="small" mobile-fullscreen close-button
    hide-default-actions>
    <h1 class="va-h5">'修改信息'</h1>
    <EditUserForm :user="userToEdit" @close="cancel" @save="save" />
  </VaModal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
import { defineVaDataTableColumns, useToast } from 'vuestic-ui'
import { api } from '../../services/api';
import { User } from './types'

import UserAvatar from './widgets/UserAvatar.vue';
import EditUserForm from './widgets/EditUserForm.vue'

const { init: notify } = useToast()
// data
const columns = defineVaDataTableColumns([
  { label: '姓名', key: 'fullname' },
  { label: '邮箱', key: 'email' },
  { label: '昵称', key: 'username' },
  // { label: '权限', key: 'role', sortable: true },
  { label: '操作', key: 'actions', align: 'center' },
])

const users = ref<User[]>([])

onMounted(async () => {
  let count = await api.post("/api/user/count", { condition: condition.value }) as number
  total.value = Math.ceil(count / limit.value)
  users.value = await query() as User[]
})
// 查询用户
const condition = ref({
  id: 0,
  fullname: "",
  password: "",
  email: "",
  username: "",
  roles: 0,
  avatar: "",
  activate: 0
})
const total = ref<number>(0)
const page = ref<number>(0)
const limit = ref<number>(20)

const query = () => {
  return api.post("/api/user/query", {
    condition: condition.value,
    offset: page.value * limit.value,
    limit: limit.value
  })
}

const changeLimit = async () => {
  let count = await api.post("/api/user/count", { condition: condition.value }) as number
  total.value = Math.ceil(count / limit.value)
  users.value = await query() as User[]
}
// 编辑用户
const isShowDialog = ref<boolean | undefined>(false)
const userToEdit = ref<User | null | undefined>(null)
const onEdit = (user: User | undefined) => {
  userToEdit.value = user
  isShowDialog.value = true
}
const save = async () => {
  users.value = await api.post("/api/user/query", { condition: condition.value }) as User[]
  isShowDialog.value = false
}

// 删除用户
const onDelete = (user: User) => {
  api.post("/api/user/delete", user).then(async () => {
    notify({ message: `${user.fullname}已被删除`, color: 'success' })
    users.value = await api.post("/api/user/query", { condition: condition.value }) as User[]
  })
}

</script>