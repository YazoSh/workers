import { BadRequestException, Injectable } from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'
import { CreateJobDTO } from 'src/common/dtos/CreateJob.dto'
import { UpdateSearchJobDTO } from 'src/common/dtos/UpdateSearchJob.dto'

@Injectable()
export class JobService {
    constructor(private dbsService: DBService) {}

    async createJob(createJobDTO: CreateJobDTO, userId: string) {
        const company = await this.dbsService.getCompany(userId)
        if (!company)
            throw new BadRequestException("The User hasn't created a company!")

        return await this.dbsService.createJob({
            ...createJobDTO,
            companyId: company.id,
        })
    }

    async getJobById(id: string) {
        return await this.dbsService.getJobById(id)
    }

    async jobSearch(searchJobDTO: UpdateSearchJobDTO) {
        return await this.dbsService.jobSearch(searchJobDTO)
    }

    async updateJob(id: string, updateJobDTO: UpdateSearchJobDTO) {
        return await this.dbsService.updateJob(id, updateJobDTO)
    }

    async applyToJob(userId: string, jobId: string) {
        const userCompany = await this.dbsService.getCompany(userId)
        const job = await this.dbsService.getJobById(jobId)
        if (userCompany && userCompany.id === job.companyId)
            throw new BadRequestException("User can't apply to their own Job")

        await this.dbsService.applyToJob(userId, jobId)
    }

    async getApplicants(jobId: string) {
        return this.dbsService.getApplicants(jobId)
    }

    async deleteJob(id: string) {
        await this.dbsService.deleteJob(id)
    }
}
