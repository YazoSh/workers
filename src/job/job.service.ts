import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'
import { Job } from 'src/common/models/job.model'
import { CreateJobDTO } from 'src/common/dtos/CreateJob.dto'
import { SearchJobDTO } from 'src/common/dtos/SearchJob.dto'
import { UpdateSearchJobDTO } from 'src/common/dtos/UpdateSearchJob.dto'

@Injectable()
export class JobService {
    constructor(private dbsService: DBService) {}

    async createJob(createJobDTO: CreateJobDTO, userId: string) {
        const company = await this.dbsService.getCompany(userId)
        if (!company)
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "The User hasn' created a company!",
                },
                HttpStatus.NOT_FOUND,
            )

        const newJob: Job = {
            ...createJobDTO,
            companyId: company.id,
        }

        return this.dbsService.createJob(newJob)
    }

    async getJobById(id: string) {
        return this.dbsService.getJobById(id)
    }

    async jobSearch(searchJobDTO: SearchJobDTO) {
        return this.dbsService.jobSearch(searchJobDTO)
    }

    async updateJob(id: string, updateJobDTO: UpdateSearchJobDTO) {
        await this.dbsService.updateJob(id, updateJobDTO)
    }

    async applyToJob(userId: string, jobId: string) {
        const userCompany = await this.dbsService.getCompany(userId)
        const job = await this.dbsService.getJobById(jobId)
        if (userCompany.id === job.companyId)
            throw new BadRequestException("User can't apply to their own Job")

        await this.dbsService.applyToJob(userId, jobId)
    }

    async deleteJob(id: string) {
        await this.dbsService.deleteJob(id)
    }
}
