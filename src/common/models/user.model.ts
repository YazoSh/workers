import { Company } from './company.model'

export class User {
    id?: string
    name: string
    email: string
    username: string
    hashedPassword: string
    company?: Company
}
