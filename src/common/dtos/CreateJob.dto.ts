import { IsString, IsAlpha, IsNotEmpty, IsEnum, IsAscii } from 'class-validator'
import { CareerLevel } from '../constants/careerLevel'

export class CreateJobDTO {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsAscii()
    location: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsEnum(CareerLevel)
    careerLevel: CareerLevel

    @IsNotEmpty()
    @IsAlpha()
    industry: string
}
