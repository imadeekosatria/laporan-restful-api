import { z, ZodType } from "zod";

export class ProdukValidation{
    static readonly CREATE : ZodType = z.object({
        name: z.string().min(1).max(100),
        harga_satuan: z.number().min(1).positive().optional(),
        harga: z.number().min(1).positive(),
        stok: z.number().min(1).positive().optional(),
        description: z.string().min(1).max(1000).optional()
    })

    static readonly UPDATE : ZodType = z.object({
        id: z.string().min(1),
        name: z.string().min(1).max(100).optional(),
        harga_satuan: z.number().min(1).positive().optional(),
        harga: z.number().min(1).positive().optional(),
        stok: z.number().min(1).positive().optional(),
        description: z.string().min(1).max(1000).optional()
    })

    static readonly GET : ZodType = z.string().min(1)

    static readonly DELETE : ZodType = z.string().min(1)
}