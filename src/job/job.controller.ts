import { Controller, Body, Delete, Get, Patch, Post } from '@nestjs/common'
import { JobService } from './job.service'
import { JobDTO } from '../common/dtos/job.dto'

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Post()
    createJob(@Body() jobDTO: JobDTO) {
        return this.jobService.createJob(jobDTO)
    }

    @Get()
    getAllJobs() {
        return this.jobService.getAllJobs()
    }

    @Patch()
    updateJob() {
        return this.jobService.updateJob()
    }

    @Delete()
    deleteJob() {
        return this.jobService.deleteJob()
    }
}
