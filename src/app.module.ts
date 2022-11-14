import { Module } from '@nestjs/common'
import { DBSModule } from './dbs/dbs.module'
import { JobModule } from './job/job.module'

@Module({
    imports: [JobModule, DBSModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
