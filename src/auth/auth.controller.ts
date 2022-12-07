import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { Role } from 'src/common/constants/role'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any) {
        return await this.authService.generateJWT({
            sub: req.user.id,
            username: req.user.username,
            role: Role.user,
        })
    }
}
