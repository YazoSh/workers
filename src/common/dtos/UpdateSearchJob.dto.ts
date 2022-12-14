import {
    IsString,
    IsAlpha,
    IsEnum,
    ValidateIf,
    IsAscii,
    IsNumber,
    IsOptional,
    IsUUID,
} from 'class-validator'
import { CareerLevel } from '../constants/careerLevel'

export class UpdateSearchJobDTO {
    @IsOptional()
    @IsUUID()
    companyId: string

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @ValidateIf((o) => o.location !== '')
    @IsAscii()
    location?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @ValidateIf((o) => o.careerLevel !== '')
    @IsEnum(CareerLevel)
    careerLevel?: CareerLevel

    @IsOptional()
    @ValidateIf((o) => o.industry !== '')
    @IsAlpha()
    industry?: string

    @IsOptional()
    @IsNumber()
    page?: number
}
