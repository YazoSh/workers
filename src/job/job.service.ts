import { Injectable } from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'
import { Job } from 'src/common/models/job.model'
import { JobDTO } from 'src/common/dtos/job.dto'

@Injectable()
export class JobService {
    constructor(private dbsService: DBService) {}

    createJob(jobDTO: JobDTO) {
        const newJob: Job = {
            ...jobDTO,
            datePosted: new Date().toISOString(),
            ownerId: 'TODO ID',
            applicants: ['No One', 'TODO'],
        }

        this.dbsService.createJob(newJob)
        return 'Created'
    }

    getAllJobs() {
        return this.dbsService.getAllJobs()
    }

    updateJob(id: string, jobDTO: JobDTO) {
        this.dbsService.updateJob(id, jobDTO)
        return 'Patched'
    }

    deleteJob(id: string) {
        this.dbsService.deleteJob(id)
        return 'Deleted'
    }
}
