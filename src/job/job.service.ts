import { Injectable } from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'
import { Job } from 'src/common/models/job.model'

@Injectable()
export class JobService {
    constructor(private dbsService: DBService) {}

    testJob: Job = {
        title: 'The Gayest Job Ever',

        location: 'Gay land',

        description:
            "You'll get to be gay as much as you want, but we'll film it and give you some of the money",

        date: new Date().toISOString(),

        company: 'Gayhub',

        industry: 'porn',

        careerLevel: 'Profisional',

        logo: 'gaylogo.png',

        referenceID: 'TODO',

        ownerID: '//TODO',

        applicants: ['NoOne', 'TODO'],
    }

    createJob() {
        this.dbsService.createJob(this.testJob)
        return 'Created'
    }

    getAllJobs() {
        return this.dbsService.getAllJobs()
    }

    updateJob() {
        this.dbsService.updateJob('TODO', { location: 'Lesbian land' })
        return 'Patched'
    }

    deleteJob() {
        this.dbsService.deleteJob('TODO')
        return 'Deleted'
    }
}
