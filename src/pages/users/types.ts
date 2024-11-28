export type UserRole = 'admin' | 'user' | 'owner'

export type User = {
  id: number;
  fullname: string;
  password: string;
  email: string;
  username: string;
  roles: number;
  avatar: string;
  activate: number;
}