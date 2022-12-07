import { Injectable } from '@nestjs/common'

import { Job } from '../common/models/job.model'
import { User } from '../common/models/user.model'
import { PrismaClient } from '@prisma/client'
import { Company } from 'src/common/models/company.model'
import { SearchJobDTO } from 'src/common/dtos/SearchJob.dto'

@Injectable()
export class DBService {
    private readonly prisma = new PrismaClient({
        errorFormat: 'minimal',
    })

    // TODO Remove
    private readonly DB: Job[] = []

    async createJob(job: Job) {
        return await this.prisma.job.create({
            data: {
                title: job.title,
                location: job.location,
                description: job.description,
                industry: job.industry,
                careerLevel: job.careerLevel,
                company: {
                    connect: { id: job.companyId },
                },
            },
        })
    }

    async getJobById(id: string) {
        return await this.prisma.job.findMany({
            where: {
                id,
            },
        })
    }

    async jobSearch(searchJobDTO: SearchJobDTO) {
        // TODO
        return await this.prisma.job.findMany()
    }

    // TODO Remove the any type
    updateJob(id: string, updatedJob: any) {
        const currentJob = this.getJobById(id)
        Object.assign(currentJob, updatedJob)
        return 'Updated Job'
    }

    async applyToJob(userId: string, jobId: string) {
        return this.prisma.job.update({
            data: {
                candidates: {
                    connect: {
                        id: userId,
                    },
                },
            },
            where: {
                id: jobId,
            },
        })
    }

    async deleteJob(id: string) {
        // TODO
        const index = this.DB.findIndex((job) => job.id == id)

        if (index >= 0) this.DB.splice(index, 1)
    }

    async createUser(user: User) {
        await this.prisma.user.create({
            data: {
                ...user,
            },
        })
    }

    async createCompany(company: Company) {
        await this.prisma.company.create({
            data: {
                name: company.name,
                logo: company.logo,
                owner: {
                    connect: {
                        id: company.ownerId,
                    },
                },
            },
        })
    }

    async getUser(username: string): Promise<User> {
        return await this.prisma.user.findFirst({
            where: {
                username,
            },
        })
    }

    async getCompany(userId: string): Promise<Company> {
        return await this.prisma.company.findUnique({
            where: {
                ownerId: userId,
            },
        })
    }
}
