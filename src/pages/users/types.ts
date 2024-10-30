export type UserRole = 'admin' | 'user' | 'owner'

export type BaseUser = {
  id: number
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar: string
  active: boolean
}

export type User = BaseUser
