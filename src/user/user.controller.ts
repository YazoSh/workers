import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateCompanyDTO } from 'src/common/dtos/CreateCompany.dto'
import { CreateUserDTO } from 'src/common/dtos/CreateUser.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async createUser(@Body() userDTO: CreateUserDTO) {
        return await this.userService.createUser(userDTO)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@Request() req: any) {
        return await this.userService.getUser(req.user.username)
    }

    @Get('company')
    @UseGuards(JwtAuthGuard)
    async getCompany(@Request() req: any) {
        return await this.userService.getCompany(req.user.sub)
    }

    @Post('company')
    @UseGuards(JwtAuthGuard)
    async createCompany(@Body() companyDTO: CreateCompanyDTO, @Req() req: any) {
        return await this.userService.createCompany(companyDTO, req.user.sub)
    }
}
