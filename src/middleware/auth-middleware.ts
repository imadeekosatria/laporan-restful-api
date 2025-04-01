import { MiddlewareHandler } from "hono";
import { UserServices } from "../services/user-services";
import { User } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header('Authorization')

    const user = await UserServices.get(token)

    c.set('user', user)

    await next()
}

export const salesMiddleware: MiddlewareHandler = async (c, next) => {
    const salesId = c.req.param('id')
    
}

export const superAdminMiddleware: MiddlewareHandler = async (c, next) => {
    const user = c.get('user') as User;
    if (user.role !== 'SUPER_ADMIN') {
        throw new HTTPException(403, {
            message: "You don't have permission to perform this action"
        });
    }
    await next();
};