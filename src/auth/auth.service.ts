import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserJWT } from '../common/models/userJWT.model'
import { DBService } from '../dbs/dbs.service'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private dbsService: DBService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.dbsService.getUser(username)

        if (user && (await bcrypt.compare(password, user.hashedPassword))) {
            const { hashedPassword, ...result } = user
            return result
        } else return null
    }

    async generateJWT(userJWT: UserJWT) {
        return {
            access_token: this.jwtService.sign({
                ...userJWT,
            }),
        }
    }
}
