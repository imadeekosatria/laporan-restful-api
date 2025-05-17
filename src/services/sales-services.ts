import { Sales, User } from "@prisma/client";
import { CreateSalesRequest, salesNameResponse, SalesNameResponses, SalesResponse, toSalesNameResponse, toSalesNameResponses, toSalesResponse, toSalesResponses, UpdateSalesRequest } from "../model/sales-model";
import { SalesValidation } from "../validation/sales-validation";
import { prismaClient } from "../app/database";
import { HTTPException } from "hono/http-exception";
import { toUserSalesResponses, toUserSalesResponseWithUser, toUserSalesResponseWithUsers, UserSalesResponses } from "../model/user-sales-model";

export class SalesServices{

    static async create(request: CreateSalesRequest): Promise<SalesResponse>{
        request = SalesValidation.CREATE.parse(request)
        await this.emailAlreadyExist(undefined, request.email)

        const sales = await prismaClient.sales.create({
            data: request
        })

        return toSalesResponse(sales)
    }

    static async addUserSales(userId: string, salesId: string): Promise<void>{

    }

    static async update(request: UpdateSalesRequest): Promise<SalesResponse>{
        request = SalesValidation.UPDATE.parse(request)
        const existingSale = await this.salesMustExist(request.id)

        if (existingSale.email !== request.email) {
            await this.emailAlreadyExist(request.id, request.email)
        }
        // console.log('Request:', request)
        const salesData = await prismaClient.sales.update({
            where: {
                id: request.id
            },
            data: request
        })

        return toSalesResponse(salesData)
    }

    static async salesMustExist(id: string): Promise<Sales>{
        const salesData = await prismaClient.sales.findFirst({
            where: {
                id: id,
            }
        })

        if (!salesData) {
            throw new HTTPException(404, {
                message: "Sales is not found"
            })   
        }

        return salesData
    }

    static async emailAlreadyExist(id: string | undefined, email: string | undefined | null): Promise<void>{
        if (!email) {
            return
        }

        const emailExist = await prismaClient.sales.findFirst({
            where:{
                email: email,
                ...(id && {NOT: {id: id}})
            },
        })

        if (emailExist){
            throw new HTTPException(409,{
                message: `Email ${email} is already in use by another sales`
            })
        }

    }
    
    static async get(id: string): Promise<SalesResponse>{
        id = SalesValidation.GET.parse(id)
        const salesData = await this.salesMustExist(id)

        return toSalesResponse(salesData)
    }

    static async getAll(user: User): Promise<any>{
        if (user.role === 'SUPER_ADMIN') {
            const salesData = await prismaClient.sales.findMany()
            if (salesData.length === 0) {
                throw new HTTPException(404, {
                    message: "No sales records found"
                });
            }
            return toSalesResponses(salesData)
        }else{
            const userSalesData = await prismaClient.userSales.findMany({
                where:{
                    user_id: user.username
                },
                include:{
                    sales: true
                }
            })
            if (userSalesData.length === 0) {
                throw new HTTPException(404, {
                    message: "No sales records found"
                });
            }
            
            return toUserSalesResponseWithUsers(userSalesData)
        }
        
    }

    static async getAllBySalesName(name: string): Promise<SalesNameResponses>{
        name = SalesValidation.GET.parse(name)
        const salesData = await prismaClient.sales.findMany({
            where:{
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                name: true,
            }
        })
        if (salesData.length === 0) {
            throw new HTTPException(404, {
                message: "No sales records found"
            });
        }
        return toSalesNameResponses(salesData)
    }

    static async delete(id: string): Promise<boolean>{
        id = SalesValidation.DELETE.parse(id)
        await this.salesMustExist(id)

        await prismaClient.sales.delete({
            where:{
                id: id
            }
        })

        return true
    }
}