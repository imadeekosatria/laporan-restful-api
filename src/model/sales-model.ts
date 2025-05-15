import { Sales } from "@prisma/client"

export type CreateSalesRequest = {
    name: string
    email?: string
    phone?: string
    address: string
}

export type UpdateSalesRequest = {
    id: string
    name?: string
    email?: string
    phone?: string
    address?: string
}

export type SalesResponse = {
    id: string
    name: string
    email?: string | null 
    phone?: string | null
    address?: string | null
}

export function toSalesResponse(sale: Sales) : SalesResponse{
    return {
        id: sale.id,
        name: sale.name,
        email: sale.email,
        phone: sale.phone,
        address: sale.address
    }
}

export type SalesResponses = {
    data: SalesResponse[]
}
export function toSalesResponses(sales: Sales[]): SalesResponses {
    return {
        data: sales.map(toSalesResponse)
    }
}