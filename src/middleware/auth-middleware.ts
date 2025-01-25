import { MiddlewareHandler } from "hono";
import { UserServices } from "../services/user-services";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header('Authorization')

    const user = await UserServices.get(token)

    c.set('user', user)

    await next()
}

export const salesMiddleware: MiddlewareHandler = async (c, next) => {
    const salesId = c.req.param('id')
    
}