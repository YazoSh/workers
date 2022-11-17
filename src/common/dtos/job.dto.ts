import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { CareerLevel } from '../constants/careerLevel'

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
    @IsEnum(CareerLevel)
    careerLevel: CareerLevel

    @IsNotEmpty()
    @IsString()
    industry: string
}
