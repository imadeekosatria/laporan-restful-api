import { z, ZodType } from "zod"

export class SetoranValidation{
    static readonly CREATE : ZodType = z.object({
        sales_id: z.string().min(1),
        total: z.number().min(1).positive(),
        setor: z.number().min(1).positive(),
        kekurangan: z.number().min(1).positive().optional()
    }).refine(data => data.total >= data.setor, {
        message: 'Total harus lebih besar atau sama dengan setoran',
        path: ['total']
    })

    static readonly UPDATE : ZodType = z.object({
        id: z.string().min(1),
        sales_id: z.string().min(1),
        total: z.number().min(1).positive().optional(),
        setor: z.number().min(1).positive().optional(),
        kekurangan: z.number().min(1).positive().optional()
    }).refine(data=> {
        if (data.total !== undefined && data.setor !== undefined) {
            return data.total >= data.setor
        }
    },{
        message: 'Total harus lebih besar atau sama dengan setoran',
        path: ['total']
    })

    static readonly GET : ZodType = z.string().min(1)

    static readonly DELETE : ZodType = z.string().min(1)
}