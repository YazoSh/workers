import { IsString, IsAlpha, IsNotEmpty, IsEnum } from 'class-validator'
import { CareerLevel } from '../constants/careerLevel'

export class CreateJobDTO {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsAlpha()
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
