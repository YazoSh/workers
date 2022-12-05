import { Injectable } from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'
import { Job } from 'src/common/models/job.model'
import { CreateJobDTO } from 'src/common/dtos/CreateJob.dto'
import { SearchJobDTO } from 'src/common/dtos/SearchJob.dto'

@Injectable()
export class JobService {
    constructor(private dbsService: DBService) {}

    async createJob(createJobDTO: CreateJobDTO) {
        // TODO pass loged in company ID
        const companyId = 'b53f3c98-0558-477e-9c04-cf4de97a0e1b'
        const newJob: Job = {
            ...createJobDTO,
            companyId: companyId,
        }

        return this.dbsService.createJob(newJob)
    }

    async getJobById(id: string) {
        return this.dbsService.getJobById(id)
    }

    async jobSearch(searchJobDTO: SearchJobDTO) {
        return this.dbsService.jobSearch(searchJobDTO)
    }

    async updateJob(id: string, createJobDTO: CreateJobDTO) {
        this.dbsService.updateJob(id, createJobDTO)
        return 'Patched'
    }

    async applyToJob(jobId: string) {
        // TODO pass loged in user ID
        const userId = 'fdec312b-d7d4-4dad-bbf6-79f60d569d0f'
        return this.dbsService.applyToJob(userId, jobId)
    }

    async deleteJob(id: string) {
        this.dbsService.deleteJob(id)
        return 'Deleted'
    }
}
