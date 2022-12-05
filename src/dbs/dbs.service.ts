import { Injectable } from '@nestjs/common'

import { Job } from '../common/models/job.model'
import { User } from '../common/models/user.model'
import { PrismaClient } from '@prisma/client'
import { SearchJobDTO } from 'src/common/dtos/SearchJob.dto'

@Injectable()
export class DBService {
    private readonly prisma = new PrismaClient()

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
        this.prisma.user.create({
            data: {
                ...user,
            },
        })
    }

    async getUser(username: string): Promise<User> {
        return this.prisma.user.findFirst({
            where: {
                username,
            },
        })
    }
}
