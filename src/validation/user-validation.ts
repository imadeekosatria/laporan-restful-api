import { password } from "bun";
import { z, ZodType } from "zod";

export class UserValidation{
    static readonly REGISTER = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100).optional()
    })

    static readonly LOGIN = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100)
    })

    static readonly TOKEN : ZodType = z.string().min(1)

    static readonly UPDATE = z.object({
        password: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional()
    })
}