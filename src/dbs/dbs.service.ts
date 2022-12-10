import { Injectable } from '@nestjs/common'

import { Job } from '../common/models/job.model'
import { User } from '../common/models/user.model'
import { PrismaClient } from '@prisma/client'
import { Company } from 'src/common/models/company.model'
import { UpdateSearchJobDTO } from 'src/common/dtos/UpdateSearchJob.dto'

@Injectable()
export class DBService {
    private readonly prisma = new PrismaClient({
        errorFormat: 'minimal',
    })

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

    async getJobById(id: string): Promise<Job> {
        return await this.prisma.job.findUnique({
            where: {
                id,
            },
        })
    }

    private ci_query(v: string): {
        contains: string
        mode: 'insensitive'
    } {
        return {
            contains: v,
            mode: 'insensitive',
        }
    }

    async jobSearch(searchJobDTO: UpdateSearchJobDTO): Promise<Job[]> {
        console.log(searchJobDTO)
        return await this.prisma.job.findMany({
            where: {
                title: this.ci_query(searchJobDTO.title),
                location: this.ci_query(searchJobDTO.location),
                description: this.ci_query(searchJobDTO.description),
                careerLevel: searchJobDTO.careerLevel,
                industry: this.ci_query(searchJobDTO.industry),
            },
        })
    }

    async updateJob(jobId: string, updatedJob: UpdateSearchJobDTO) {
        return await this.prisma.job.update({
            data: {
                ...updatedJob,
            },
            where: {
                id: jobId,
            },
        })
    }

    async applyToJob(userId: string, jobId: string) {
        return await this.prisma.job.update({
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

    async deleteJob(jobId: string) {
        return this.prisma.job.delete({
            where: {
                id: jobId,
            },
        })
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
