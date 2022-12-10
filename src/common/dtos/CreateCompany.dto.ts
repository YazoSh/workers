import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCompanyDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    logo: string
}
