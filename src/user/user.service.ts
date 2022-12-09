import { Injectable } from '@nestjs/common'
import { DBService } from '../dbs/dbs.service'
import { CreateUserDTO } from '../common/dtos/CreateUser.dto'
import { CreateCompanyDTO } from 'src/common/dtos/CreateCompany.dto'

@Injectable()
export class UserService {
    constructor(private dbsService: DBService) {}

    async createUser(user: CreateUserDTO) {
        await this.dbsService.createUser({
            name: user.name,
            username: user.username,
            email: user.email,
            // TODO Hashpassword
            hashedPassword: user.password,
        })
    }

    async createCompany(companyDTO: CreateCompanyDTO, userId: string) {
        await this.dbsService.createCompany({
            ...companyDTO,
            // TODO Logo implemention
            logo: 'No Logo for now',
            ownerId: userId,
        })
    }
}
