import { z, ZodType } from "zod";

export class SalesValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(100).optional(),
        address: z.string().min(1).max(100).optional()
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.string().min(1),
        name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(100).optional(),
        address: z.string().min(1).max(100).optional()
    })

    static readonly GET : ZodType = z.string().min(1)

    static readonly DELETE : ZodType = z.string().min(1)
}