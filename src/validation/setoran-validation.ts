import { z, ZodType } from "zod"

export class SetoranValidation{
    static readonly CREATE : ZodType = z.object({
        sales_id: z.string().min(1),
        total: z.number().min(1).positive(),
        setoran: z.number().min(1).positive()
    })

    static readonly UPDATE : ZodType = z.object({
        id: z.string().min(1),
        sales_id: z.string().min(1),
        total: z.number().min(1).positive().optional(),
        setoran: z.number().min(1).positive().optional()
    })

    static readonly GET : ZodType = z.string().min(1)

    static readonly DELETE : ZodType = z.string().min(1)
}