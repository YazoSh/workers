import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class NormalaizeInput implements PipeTransform {
    transform(value: any) {
        for (const prob in value) {
            const t = value[prob].trim().replace(/\s+/g, ' ')
            if (!t) delete value[prob]
            else value[prob] = t
        }
        return value
    }
}
