import { Prisma } from "@prisma/client"
import { z, ZodType } from "zod"

export class SetoranValidation{
    static readonly CREATE : ZodType = z.object({
        sales_id: z.string().min(1),
        total: z.number().min(1).positive(),
        setor: z.number().min(1).positive(),
        kekurangan: z.number().min(1).positive().optional()
    }).refine(data => data.total >= data.setor, {
        message: 'Total harus lebih besar atau sama dengan setoran',
        path: ['total', 'setor']
    }).refine(data => {
        if (data.setor < data.total && data.kekurangan === undefined) {
            return false;
        }
        return true;
    }, {
        message: 'Kekurangan harus ditambahkan jika setoran lebih kecil dari total',
        path: ['kekurangan']
    })

    static readonly UPDATE : ZodType = z.object({
        id: z.string().min(1),
        sales_id: z.string().min(1),
        total: z.number().min(1).positive().optional(),
        setor: z.number().min(1).positive().optional(),
        kekurangan: z.number().min(1).positive().optional()
    }).refine(data => {
        if (data.total !== undefined && data.setor !== undefined) {
            if (data.total < data.setor) {
                return false
            }
        }
        if (data.kekurangan !== undefined) {
            if (data.total === undefined || data.setor === undefined || data.setor >= data.total) {
                return false
            }
            const total = new Prisma.Decimal(data.total)
            const setor = new Prisma.Decimal(data.setor)
            const kekurangan = new Prisma.Decimal(data.kekurangan)
            if (!total.minus(setor).equals(kekurangan)) {
                return false
            }
        }
        return true
    }, {
        message: 'Total harus lebih besar atau sama dengan setoran dan setoran harus lebih kecil dari total jika kekurangan diupdate',
        path: ['total', 'setor', 'kekurangan']
    })

    static readonly GET : ZodType = z.string().min(1)

    static readonly DELETE : ZodType = z.string().min(1)
}