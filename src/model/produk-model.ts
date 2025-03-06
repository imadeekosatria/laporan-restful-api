import { Produk } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export type CreateProdukRequest = {
    name: string
    harga_satuan?: Decimal
    harga: Decimal
    stok?: number
    description?: string
}

export type UpdateProdukRequest = {
    id: string
    name?: string
    harga_satuan?: Decimal
    harga?: Decimal
    stok?: number
    description?: string
}

export type ProdukResponse = {
    id: string
    name: string
    harga_satuan?: Decimal | null
    harga: Decimal
    stok?: number | null
    description?: string | null
}

export function toProdukResponse(produk: Produk) :ProdukResponse{
    return {
        id: produk.id,
        name: produk.name,
        harga_satuan: produk.harga_satuan,
        harga: produk.harga,
        stok: produk.stok,
        description: produk.description
    }
}