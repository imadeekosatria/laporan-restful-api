import { Sales } from "@prisma/client"

export type CreateSaleRequest = {
    name: string
    email?: string
    phone?: string
    address: string
}

export type UpdateSaleRequest = {
    id: string
    name?: string
    email?: string
    phone?: string
    address?: string
}

export type DeleteSaleRequest = {
    id: string
}

export type SaleResponse = {
    id: string
    name: string
    email?: string | null 
    phone?: string | null
    address?: string | null
}

export function toSalesResponse(sale: Sales) : SaleResponse{
    return {
        id: sale.id,
        name: sale.name,
        email: sale.email,
        phone: sale.phone,
        address: sale.address
    }
}