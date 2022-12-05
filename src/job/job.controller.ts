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
import { CreateJobDTO } from 'src/common/dtos/CreateJob.dto'
import { SearchJobDTO } from 'src/common/dtos/SearchJob.dto'

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
    createJob(@Body() createJobDTO: CreateJobDTO) {
        return this.jobService.createJob(createJobDTO)
    }

    @Get(':id')
    getJobById(@Param('id') id: string) {
        return this.jobService.getJobById(id)
    }

    @Get()
    jobSearch(@Body() searchJobDTO: SearchJobDTO) {
        return this.jobService.jobSearch(searchJobDTO)
    }

    @Patch(':id')
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: true,
        }),
    )
    updateJob(@Param('id') id: string, @Body() createJobDTO: CreateJobDTO) {
        return this.jobService.updateJob(id, createJobDTO)
    }

    @Post('apply/:id')
    applytoJob(@Param('id') id: string) {
        return this.jobService.applyToJob(id)
    }

    @Delete(':id')
    deleteJob(@Param('id') id: string) {
        return this.jobService.deleteJob(id)
    }
}
