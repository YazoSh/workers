import {
    Controller,
    Body,
    Delete,
    Get,
    Patch,
    Post,
    Param,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { JobService } from './job.service'
import { JobDTO } from '../common/dtos/job.dto'

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Post()
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    createJob(@Body() jobDTO: JobDTO) {
        return this.jobService.createJob(jobDTO)
    }

    @Get()
    getAllJobs() {
        return this.jobService.getAllJobs()
    }

    @Patch(':id')
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: true,
        }),
    )
    updateJob(@Param('id') id: string, @Body() jobDTO: JobDTO) {
        return this.jobService.updateJob(id, jobDTO)
    }

    @Delete(':id')
    deleteJob(@Param('id') id: string) {
        return this.jobService.deleteJob(id)
    }
}
