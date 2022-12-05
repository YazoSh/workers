import { IsString, IsAlpha, IsEnum } from 'class-validator'
import { CareerLevel } from '../constants/careerLevel'

export class SearchJobDTO {
    @IsString()
    title?: string

    @IsAlpha()
    location?: string

    @IsString()
    description?: string

    @IsEnum(CareerLevel)
    careerLevel?: CareerLevel

    @IsAlpha()
    industry?: string
}
