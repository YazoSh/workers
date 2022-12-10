import { IsString, IsAlpha, IsEnum, ValidateIf, IsAscii } from 'class-validator'
import { CareerLevel } from '../constants/careerLevel'

export class UpdateSearchJobDTO {
    @IsString()
    title?: string

    @ValidateIf((o) => o.location !== '')
    @IsAscii()
    location?: string

    @IsString()
    description?: string

    @ValidateIf((o) => o.careerLevel !== '')
    @IsEnum(CareerLevel)
    careerLevel?: CareerLevel

    @ValidateIf((o) => o.industry !== '')
    @IsAlpha()
    industry?: string
}
