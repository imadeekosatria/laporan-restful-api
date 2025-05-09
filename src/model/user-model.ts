import { Role, User } from "@prisma/client";

export type RegisterUserRequest = {
    username: string
    password: string
    name?: string
}

export type LoginUserRequest = {
    username: string
    password: string
}

export type UpdateUserRequest = {
    password?: string
    name? : string
}

export type UserResponse = {
    username: string
    name: string | null
    role: Role
    token?: string
    authenticated?: boolean
}

export function toUserResponse(user: User): UserResponse{
    return {
        name: user.name,
        username: user.username,
        role: user.role,
        authenticated: user.authenticated,
    }
}