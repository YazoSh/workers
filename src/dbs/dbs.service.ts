import { Injectable } from '@nestjs/common'

import { Job } from '../common/models/job.model'

@Injectable()
export class DBService {
    private readonly DB: Job[] = []

    createJob(job: Job) {
        this.DB.push(job)
    }

    getAllJobs() {
        return this.DB
    }

    getJobById(id: string) {
        return this.DB.find((job) => job.referenceID === id)
    }

    updateJob(id: string, updatedJob: any) {
        const currentJob = this.getJobById(id)
        Object.assign(currentJob, updatedJob)
    }

    deleteJob(id: string) {
        const index = this.DB.findIndex((job) => job.referenceID == id)

        if (index >= 0) this.DB.splice(index, 1)
    }
}
