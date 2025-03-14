import { Transaksi } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export type CreateTransaksiRequest = {
    sales_id: string
    produk_id: string
    harga: Decimal
    jumlah: Decimal
    total: Decimal
    setoran_id?: string
}

export type UpdateTransaksiRequest = {
    id: string
    sales_id: string
    produk_id: string
    harga: Decimal
    jumlah?: Decimal
    total?: Decimal
    transaksi_id: string
    setoran_id?: string
}

export type TransaksiResponse = {
    id: string
    sales_id: string
    produk_id: string
    harga: Decimal
    jumlah: Decimal
    total: Decimal
    transaksi_id: string
    setoran_id?: string
}

export function toTransaksiResponse(transaksi: Transaksi) : TransaksiResponse{
    return {
        id: transaksi.id,
        sales_id: transaksi.sales_id,
        produk_id: transaksi.produk_id,
        harga: transaksi.harga,
        jumlah: transaksi.jumlah,
        total: transaksi.total,
        transaksi_id: transaksi.setoran_id,
        setoran_id: transaksi.setoran_id
    }
}

export type TransaksiResponses = {
    data: TransaksiResponse[]
}

export function toTransaksiResponses(transaksis: Transaksi[]): TransaksiResponses {
    return {
        data: transaksis.map(toTransaksiResponse)
    }
}