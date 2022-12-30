import { Injectable } from '@nestjs/common'
import { DBService } from '../dbs/dbs.service'
import { CreateUserDTO } from '../common/dtos/CreateUser.dto'
import { CreateCompanyDTO } from 'src/common/dtos/CreateCompany.dto'
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private dbsService: DBService) {}

    async createUser(user: CreateUserDTO) {
        await this.dbsService.createUser({
            name: user.name,
            username: user.username,
            email: user.email,
            hashedPassword: await bcrypt.hash(user.password, 10),
        })
        return {
            success: true,
        }
    }

    async getUser(username: string) {
        const user = await this.dbsService.getUser(username)
        console.log(user)
        return {
            success: user != null,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        }
    }

    async getCompany(userId: string) {
        const company = await this.dbsService.getCompany(userId)
        return {
            success: company !== null,
            data: {
                ...company,
            },
        }
    }

    async createCompany(companyDTO: CreateCompanyDTO, userId: string) {
        await this.dbsService.createCompany({
            ...companyDTO,
            // TODO Logo implemention
            logo: 'No Logo for now',
            ownerId: userId,
        })
        return {
            success: true,
        }
    }
}
