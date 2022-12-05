import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DBSModule } from './dbs/dbs.module'
import { JobModule } from './job/job.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        JobModule,
        DBSModule,
        AuthModule,
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
