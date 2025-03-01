import { Produk, Sales } from "@prisma/client"
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
                name: {
                    contains: "test"
                }
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

export class ProdukTest{
    static async create(){
        await prismaClient.produk.create({
            data:{
                name: "test",
                harga: 10000,
                stok: 10
            }
        })
    }

    static async createBatch(){
        await prismaClient.produk.createMany({
            data: [
            {
                name: "test1",
                harga: 10000,
                stok: 10
            },
            {
                name: "test2",
                harga: 10000,
                stok: 10
            },
            {
                name: "test3",
                harga: 10000,
                stok: 10
            }
            ]
        })
    }

    static async deleteAll(){
        await prismaClient.produk.deleteMany({
            where: {
                name: {
                    contains: "test"
                }
            }
        })
    }

    static async getByName(): Promise<Produk>{
        return await prismaClient.produk.findFirstOrThrow({
            where: {
                name: "test"
            }
        })
    }

    static async getById(id: string): Promise<Produk>{
        return await prismaClient.produk.findFirstOrThrow({
            where: {
                id: id
            }
        })
    }
}