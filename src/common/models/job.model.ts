import { CareerLevel } from '../constants/careerLevel'

export class Job {
    id?: string

    title: string

    location: string

    description: string

    datePosted?: Date

    industry: string

    careerLevel: CareerLevel

    companyId: string

    applicants?: string[]
}
