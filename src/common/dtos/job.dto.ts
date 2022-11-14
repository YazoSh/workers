import { IsString, IsNotEmpty } from 'class-validator'

export class JobDTO {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    location: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    careerLevel: string

    @IsNotEmpty()
    @IsString()
    industry: string
}
