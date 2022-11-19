import { Injectable } from '@nestjs/common'

import { Job } from '../common/models/job.model'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DBService {
    private readonly prisma = new PrismaClient()

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

    async getAllJobs() {
        return await this.prisma.job.findMany()
    }

    getJobById(id: string) {
        return this.DB.find((job) => job.id === id)
    }

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

    deleteJob(id: string) {
        const index = this.DB.findIndex((job) => job.id == id)

        if (index >= 0) this.DB.splice(index, 1)
    }
}
