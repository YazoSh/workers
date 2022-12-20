import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DBSModule } from './dbs/dbs.module'
import { JobModule } from './job/job.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { FileModule } from './file/file.module'

@Module({
    imports: [
        JobModule,
        DBSModule,
        AuthModule,
        UserModule,
        FileModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
