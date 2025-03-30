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

import axios from 'axios'

export const queryUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  const { page = 1, perPage = 10, total = 0, sortBy, sortingOrder, isActive, search } = filters

  const params = {
    page,
    perPage,
    total,
    sortBy: sortBy || '',
    sortingOrder: sortingOrder || '',
    isActive: isActive ? 1 : 0,
    search: search || '',
  }

  console.log(params)
  // @Data
  // public class QueryParam<T> {
  //     private T condition;
  //     private int offset = 0;
  //     private int limit = 20;

  //     public QueryParam(){
  //     }

  //     public QueryParam(T condition){
  //         this.condition = condition;
  //     }
  // }

  // try {
  //   const response = await axios.get('/api/users', { params });
  //   return response.data;
  // } catch (error) {
  //   console.error('Error fetching users:', error);
  //   throw error;
  // }
}

export const getUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  await sleep(1000)
  const { isActive, search, sortBy, sortingOrder } = filters
  let filteredUsers = users

  filteredUsers = filteredUsers.filter((user) => user.active === isActive)

  if (search) {
    filteredUsers = filteredUsers.filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase()))
  }

  filteredUsers = filteredUsers.map((user) => ({ ...user }))

  if (sortBy && sortingOrder) {
    filteredUsers = filteredUsers.sort((a, b) => {
      const first = getSortItem(a, sortBy)
      const second = getSortItem(b, sortBy)
      if (first > second) {
        return sortingOrder === 'asc' ? 1 : -1
      }
      if (first < second) {
        return sortingOrder === 'asc' ? -1 : 1
      }
      return 0
    })
  }

  const { page = 1, perPage = 10 } = filters || {}
  return {
    data: filteredUsers.slice((page - 1) * perPage, page * perPage),
    pagination: {
      page,
      perPage,
      total: filteredUsers.length,
    },
  }
}
