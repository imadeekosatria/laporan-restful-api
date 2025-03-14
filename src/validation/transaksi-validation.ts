import { z, ZodType } from "zod"

export class TransaksiValidation{
    static readonly CREATE : ZodType = z.object({
        sales_id: z.string().min(1),
        produk_id: z.string().min(1),
        harga: z.number().min(1).positive(),
        jumlah: z.number().min(1).positive(),
        total: z.number().min(1).positive(),
        setoran_id: z.string().min(1).optional(),
    })

    static readonly CREATE_ARRAY : ZodType = z.array(TransaksiValidation.CREATE)

    static readonly UPDATE : ZodType = z.object({
        id: z.string().min(1),
        sales_id: z.string().min(1),
        produk_id: z.string().min(1),
        harga: z.number().min(1).positive(),
        jumlah: z.number().min(1).positive().optional(),
        total: z.number().min(1).positive().optional(),
        setoran_id: z.string().min(1),
    })

    static readonly UPDATE_ARRAY : ZodType = z.array(TransaksiValidation.UPDATE)

    static readonly GET : ZodType = z.string().min(1)

    static readonly DELETE : ZodType = z.string().min(1)
}