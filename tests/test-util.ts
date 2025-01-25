import { Sales } from "@prisma/client"
import { prismaClient } from "../src/app/database"

export class UserTest{
    static async create(){
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await Bun.password.hash("test", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: "test"
            }
        })
    }

    static async delete(){
        await prismaClient.user.deleteMany({
            where:{
                username: "test"
            }
        })
    }
}

export class SalesTest{
    static async create(){
        await prismaClient.sales.create({
            data:{
                name: "test",
                email: "test@mail.com",
                phone: "08123456789",
                address: "jl. test no. 19",
            }
        })
    }

    static async deleteAll(){
        await prismaClient.sales.deleteMany({
            where: {
                name: "test"
            }
        })
    }

    static async get(): Promise<Sales>{
        return await prismaClient.sales.findFirstOrThrow({
            where: {
                email: "test@mail.com"
            }
        })
    }
}