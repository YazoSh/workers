import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { UserJWT } from '../common/models/userJWT.model'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.getUser(username)
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
