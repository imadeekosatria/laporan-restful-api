import { SalesResponse } from "./sales-model"

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
    username: string
    sales_id: string
}

export type UserSalesResponseWithUser = {
    id: string
    user_id: string
    sales: SalesResponse
}

export type UserSalesResponseWithUsers = {
    data: UserSalesResponseWithUser[]
}

export function toUserSalesResponseWithUser(userSales: UserSalesResponseWithUser): UserSalesResponseWithUser {
    return {
        id: userSales.id,
        user_id: userSales.user_id,
        sales: {
            id: userSales.sales.id,
            name: userSales.sales.name,
            email: userSales.sales.email,
            phone: userSales.sales.phone,
            address: userSales.sales.address
        }
    }
}

export function toUserSalesResponseWithUsers(userSales: UserSalesResponseWithUser[]): UserSalesResponseWithUsers {
    return {
        data: userSales.map(toUserSalesResponseWithUser)

    }
}

export function toUserSalesResponse(userSales: UserSalesResponse): UserSalesResponse {
    return {
        id: userSales.id,
        username: userSales.username,
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