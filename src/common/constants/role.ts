export const Role: { [x: string]: 'user' | 'admin' } = {
    user: 'user',
    admin: 'admin',
}

export type Role = typeof Role[keyof typeof Role]
