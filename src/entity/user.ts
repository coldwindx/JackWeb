export type UserRole = 'admin' | 'user' | 'guest'

export type User = {
  id: number
  fullname: string
  password: string
  email: string
  username: string
  roles: number
  avatar: string
  activate: number
}

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  isActive: boolean
  search: string
}
