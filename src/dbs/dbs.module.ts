import { Module, Global } from '@nestjs/common'

import { DBService } from './dbs.service'

@Global()
@Module({
    exports: [DBService],
    providers: [DBService],
})
export class DBSModule {}
