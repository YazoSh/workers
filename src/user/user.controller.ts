import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateCompanyDTO } from 'src/common/dtos/CreateCompany.dto'
import { CreateUserDTO } from 'src/common/dtos/CreateUser.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async createUser(@Body() userDTO: CreateUserDTO) {
        await this.userService.createUser(userDTO)
    }

    @Post('company')
    @UseGuards(JwtAuthGuard)
    async createCompany(@Body() companyDTO: CreateCompanyDTO, @Req() req: any) {
        await this.userService.createCompany(companyDTO, req.user.sub)
    }
}
