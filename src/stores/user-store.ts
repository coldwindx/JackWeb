import { defineStore } from 'pinia'
import { User } from '../entity/user'

export const useUserStore = defineStore('user', {
  // static data
  state: () => ({
    user: {
      id: 0,
      fullname: '',
      password: '',
      email: '',
      username: '',
      roles: 1,
      avatar: '',
      activate: 0,
      is2FAEnabled: false,
    },
  }),
  persist: {
    pick: ['user.id', 'user.fullname', 'user.password','user.email', 'user.username', 'user.roles', 'user.avatar', 'user.is2FAEnabled'],
  },
  // 相当于计算属性(有数据缓存)
  getters: {
    getUser(state) {
      return state.user
    },
  },
  // actions即可以是同步函数也可以是异步函数
  actions: {
    setUser(user: User) {
      console.log(user)
      this.user.id = user.id
      this.user.fullname = user.fullname
      this.user.email = user.email
      this.user.username = user.username
      this.user.roles = user.roles
      this.user.avatar = user.avatar
      this.user.activate = user.activate
    },
  },
})
