import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { Response } from 'express'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(e: PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.log(e)

        const status = HttpStatus.FORBIDDEN

        const msg =
            e.code === 'P2002'
                ? `Username or Email Already used!`
                : 'Database violation'

        const response: Response = host.switchToHttp().getResponse<Response>()

        response.status(status).json({
            statusCode: status,
            error: msg,
        })
    }
}
