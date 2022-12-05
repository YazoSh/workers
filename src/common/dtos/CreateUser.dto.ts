import {
    IsString,
    IsAlpha,
    IsAscii,
    IsNotEmpty,
    IsEmail,
} from 'class-validator'

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsAlpha()
    username: string

    @IsNotEmpty()
    @IsAscii()
    password: string
}
