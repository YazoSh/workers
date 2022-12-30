import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs, { createReadStream } from 'fs'
const fsPromises = fs.promises

@Injectable()
export class FileService {
    private cvStorageDIR: string

    constructor(private configService: ConfigService) {
        this.cvStorageDIR = this.configService.get<string>(
            'CV_FILE_STORAGE_DIR',
        )
    }

    private getPath(userId: string) {
        return this.cvStorageDIR + `/cv-${userId}.pdf`
    }

    async uploadCV(file: Express.Multer.File, userId: string) {
        const fileHandler = await fsPromises.open(this.getPath(userId), 'w')
        await fileHandler.write(file.buffer)
        await fileHandler.close()

        return {
            success: true,
        }
    }

    hasCV(userId: string) {
        return fs.existsSync(this.getPath(userId))
    }

    getCV(userId: string): StreamableFile {
        if (!this.hasCV(userId)) throw new NotFoundException('File Not Found')
        const file = createReadStream(this.getPath(userId))
        return new StreamableFile(file)
    }
}
