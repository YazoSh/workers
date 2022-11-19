import { Injectable } from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'
import { Job } from 'src/common/models/job.model'
import { JobDTO } from 'src/common/dtos/job.dto'

@Injectable()
export class JobService {
    constructor(private dbsService: DBService) {}

    async createJob(jobDTO: JobDTO) {
        // TODO pass loged in company ID
        const companyId = '20b22bf9-3f71-4f67-b6fa-081ae5e28888'
        const newJob: Job = {
            ...jobDTO,
            companyId: companyId,
        }

        return this.dbsService.createJob(newJob)
    }

    async getAllJobs() {
        return this.dbsService.getAllJobs()
    }

    async updateJob(id: string, jobDTO: JobDTO) {
        this.dbsService.updateJob(id, jobDTO)
        return 'Patched'
    }

    async applyToJob(jobId: string) {
        // TODO pass loged in user ID
        const userId = '48396995-ee41-453b-adab-d8dbcadd899b'
        return this.dbsService.applyToJob(userId, jobId)
    }

    async deleteJob(id: string) {
        this.dbsService.deleteJob(id)
        return 'Deleted'
    }
}
