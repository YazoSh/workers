import { CareerLevel } from '../constants/careerLevel'

export class Job {
    id?: string

    title: string

    location: string

    description: string

    datePosted: string

    industry: string

    careerLevel: CareerLevel

    ownerId: string

    applicants: string[]
}
