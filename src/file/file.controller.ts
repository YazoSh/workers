import {
    Controller,
    Param,
    Post,
    Get,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    StreamableFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FileService } from './file.service'
import { FileTypeValidator } from 'src/common/pipes/FileTypeValidator.pipe'
import multer from 'multer'

@Controller('/file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('cv')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('cv', {
            storage: multer.memoryStorage(),
            limits: { fileSize: 1000000 },
        }),
    )
    async uploadCV(
        @UploadedFile(new FileTypeValidator('pdf')) file: Express.Multer.File,
        @Request() req: any,
    ) {
        return await this.fileService.uploadCV(file, req.user.sub)
    }

    @Get('cv/:id')
    async hasCV(@Param('id') userId: string) {
        return {
            hasCV: this.fileService.hasCV(userId),
        }
    }

    @Get('cv/download/:id')
    getCV(@Param('id') userId: string): StreamableFile {
        return this.fileService.getCV(userId)
    }
}
