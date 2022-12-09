import { Injectable, ExecutionContext } from '@nestjs/common'
import { DBService } from 'src/dbs/dbs.service'

@Injectable()
export class JobGuard {
    constructor(private dbsService: DBService) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        // TODO Implmente Admin privilages
        const req = ctx.switchToHttp().getRequest()
        const company = await this.dbsService.getCompany(req.user.sub)
        const job = await this.dbsService.getJobById(req.params.id)

        return job && company && company.id == job.companyId
    }
}
