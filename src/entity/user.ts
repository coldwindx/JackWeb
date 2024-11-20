export type UserRole = 'admin' | 'user' | 'guest'

export type User = {
    id: number;
    fullname: string;
    email: string;
    username: string;
    roles: number;
    avatar: string;
    activate: number
}
