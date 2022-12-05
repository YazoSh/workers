import { Injectable } from '@nestjs/common'
import { DBService } from '../dbs/dbs.service'
import { CreateUserDTO } from '../common/dtos/CreateUser.dto'
import { User } from '../common/models/user.model'

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

    async getUser(username: string): Promise<User> {
        return await this.dbsService.getUser(username)
    }
}
