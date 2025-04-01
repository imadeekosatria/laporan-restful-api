export type CreateUserSalesRequest = {
    user_id: string
    sales_id: string
}

export type UpdateUserSalesRequest = {
    id: string
    user_id: string
    sales_id: string
}

export type UserSalesResponse = {
    id: string
    user_id: string
    sales_id: string
}

export function toUserSalesResponse(userSales: UserSalesResponse): UserSalesResponse {
    return {
        id: userSales.id,
        user_id: userSales.user_id,
        sales_id: userSales.sales_id
    }
}
export type UserSalesResponses = {
    data: UserSalesResponse[]
}
export function toUserSalesResponses(userSales: UserSalesResponse[]): UserSalesResponses {
    return {
        data: userSales.map(toUserSalesResponse)
    }
}