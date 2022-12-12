import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class NormalaizeInput implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        for (const prob in value) {
            if (
                metadata.type != 'body' ||
                Object.prototype.toString.call(value[prob]) !==
                    '[object String]'
            )
                continue

            const t = value[prob].trim().replace(/\s+/g, ' ')
            if (!t) delete value[prob]
            else value[prob] = t
        }
        return value
    }
}
