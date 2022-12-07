import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserJWT } from '../common/models/userJWT.model'
import { DBService } from '../dbs/dbs.service'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private dbsService: DBService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.dbsService.getUser(username)
        // TODO Compare to the hased password
        if (user && user.hashedPassword === password) {
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
