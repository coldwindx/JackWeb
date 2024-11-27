<script setup lang="ts">
// import { ref } from 'vue'
// import UsersTable from './widgets/UsersTable.vue'
// import EditUserForm from './widgets/EditUserForm.vue'
// import { User } from './types'
// import { useUsers } from './composables/useUsers'
// import { useModal, useToast } from 'vuestic-ui'

// const doShowEditUserModal = ref(false)
// const { users, isLoading, filters, sorting, pagination, ...usersApi } = useUsers()
// const userToEdit = ref<User | null>(null)

// const showEditUserModal = (user: User) => {
//   userToEdit.value = user
//   doShowEditUserModal.value = true
// }

// const showAddUserModal = () => {
//   userToEdit.value = null
//   doShowEditUserModal.value = true
// }

// const { init: notify } = useToast()

// const onUserSaved = async (user: User) => {
//   if (userToEdit.value) {
//     await usersApi.update(user)
//     notify({
//       message: `${user.fullname}已被修改`,
//       color: 'success',
//     })
//   } else {
//     usersApi.add(user)
//     notify({
//       message: `${user.fullname}已被创建`,
//       color: 'success',
//     })
//   }
// }

// const onUserDelete = async (user: User) => {
//   await usersApi.remove(user)
//   notify({
//     message: `${user.fullname}已被删除`,
//     color: 'success',
//   })
// }

// const editFormRef = ref()

// const { confirm } = useModal()

// const beforeEditFormModalClose = async (hide: () => unknown) => {
//   if (editFormRef.value.isFormHasUnsavedChanges) {
//     const agreed = await confirm({
//       maxWidth: '380px',
//       message: '表单有未保存的更改，你确定要关闭吗？',
//       size: 'small',
//     })
//     if (agreed) {
//       hide()
//     }
//   } else {
//     hide()
//   }
// }
</script>

<template>
  <h1 class="page-title">用户管理</h1>
  <!-- 
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="filters.isActive"
            color="background-element"
            border-color="background-element"
            style="width: 200px"
            :options="[
              { label: '活跃', value: true },
              { label: '离线', value: false },
            ]"
          />
          <VaInput v-model="filters.search" placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddUserModal">新增用户</VaButton>
      </div>

      <UsersTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :users="users"
        :loading="isLoading"
        :pagination="pagination"
        @editUser="showEditUserModal"
        @deleteUser="onUserDelete"
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? '修改信息' : '新增用户' }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? '保存' : '添加'"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user)
          ok()
        }
      "
    />
  </VaModal> -->
</template>
