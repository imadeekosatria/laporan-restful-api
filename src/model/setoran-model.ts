import { Setoran } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export type CreateSetoranRequest = {
    sales_id: string
    total: Decimal
    setor: Decimal
}

export type UpdateSetoranRequest = {
    id: string
    sales_id: string
    total?: Decimal
    setor?: Decimal
}

export type SetoranResponse = {
    id: string
    sales_id: string
    total: Decimal
    setor: Decimal
}

export function toSetoranResponse(setoran: Setoran) : SetoranResponse{
    return {
        id: setoran.id,
        sales_id: setoran.sales_id,
        total: setoran.total,
        setor: setoran.setor
    }
}