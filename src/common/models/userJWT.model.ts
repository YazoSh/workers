import { Role } from '../constants/role'

export class UserJWT {
    sub: string
    username: string
    role: Role
    iat?: number
}
