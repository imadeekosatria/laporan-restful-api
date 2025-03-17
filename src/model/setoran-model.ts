import { Setoran } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { TransaksiResponses } from "./transaksi-model"

export type CreateSetoranRequest = {
    sales_id: string
    total: Decimal
    setor: Decimal
    kekurangan?: Decimal
}

export type UpdateSetoranRequest = {
    id: string
    sales_id: string
    total?: Decimal
    setor?: Decimal
    kekurangan?: Decimal
}

export type SetoranResponse = {
    id: string
    sales_id: string
    total: Decimal
    setor: Decimal
    kekurangan: Decimal
}

export type SetoranTransaksiResponse = {
    setoran: SetoranResponse
    transaksi: TransaksiResponses
}

export function toSetoranResponse(setoran: Setoran) : SetoranResponse{
    return {
        id: setoran.id,
        sales_id: setoran.sales_id,
        total: setoran.total,
        setor: setoran.setor,
        kekurangan: setoran.kekurangan
    }
}

export function toSetoranTransaksiResponse(setoran: Setoran, transaksi: TransaksiResponses) : SetoranTransaksiResponse {
    return {
        setoran: toSetoranResponse(setoran),
        transaksi: transaksi
    }
}