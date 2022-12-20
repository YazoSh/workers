import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class FileTypeValidator implements PipeTransform {
    fileTypeFromBuffer: any = undefined

    constructor(private validFileType: string) {}

    async transform(file: any) {
        if (!file) throw new BadRequestException("'cv' File is missing!")

        // This Module is dynamicly loaded using eval
        // To prevent Typescript from transpiling the Import to a CommonJS Require
        // see issue:
        // https://stackoverflow.com/questions/70545129/compile-a-package-that-depends-on-esm-only-library-into-a-commonjs-package
        if (!this.fileTypeFromBuffer) {
            this.fileTypeFromBuffer = (
                await (eval(`import('file-type')`) as Promise<
                    typeof import('file-type')
                >)
            ).fileTypeFromBuffer
        }

        const fileType = await this.fileTypeFromBuffer(file.buffer)

        if (fileType && this.validFileType === fileType.ext) return file
        else throw new BadRequestException('File is not PDF')
    }
}
