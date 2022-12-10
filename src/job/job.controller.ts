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
    UseGuards,
    Request,
} from '@nestjs/common'
import { JobService } from './job.service'
import { CreateJobDTO } from 'src/common/dtos/CreateJob.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { JobGuard } from 'src/common/guards/JobGuard.guard'
import { UpdateSearchJobDTO } from 'src/common/dtos/UpdateSearchJob.dto'
import { NormalaizeInput } from 'src/common/pipes/NormalizeInput.pipe'

@UsePipes(NormalaizeInput)
@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createJob(@Body() createJobDTO: CreateJobDTO, @Request() req: any) {
        return await this.jobService.createJob(createJobDTO, req.user.sub)
    }

    @Get(':id')
    async getJobById(@Param('id') id: string) {
        return await this.jobService.getJobById(id)
    }

    @Get()
    async jobSearch(@Body() searchJobDTO: UpdateSearchJobDTO) {
        return await this.jobService.jobSearch(searchJobDTO)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, JobGuard)
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: true,
        }),
    )
    async updateJob(
        @Param('id') id: string,
        @Body() updatedJobDTO: UpdateSearchJobDTO,
    ) {
        return await this.jobService.updateJob(id, updatedJobDTO)
    }

    @Post('apply/:id')
    @UseGuards(JwtAuthGuard)
    async applytoJob(@Param('id') jobId: string, @Request() req: any) {
        await this.jobService.applyToJob(req.user.sub, jobId)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, JobGuard)
    async deleteJob(@Param('id') id: string) {
        await this.jobService.deleteJob(id)
    }
}
