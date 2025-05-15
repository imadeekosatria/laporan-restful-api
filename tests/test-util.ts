import { Produk, Sales, Setoran } from "@prisma/client"
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

    static async createadmin(){
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                role: "ADMIN",
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

    static async createBatch(){
        await prismaClient.sales.createMany({
            data: [
            {
                name: "test1",
                email: "test1@mail.com",
                phone: "08123456789",
                address: "jl. test no. 19"
            },
            {
                name: "test2",
                email: "test2@mail.com",
                phone: "08123456788",
                address: "jl. test no. 20"
            },
            {
                name: "test3",
                email: "test3@mail.com",
                phone: "08123456787",
                address: "jl. test no. 21"
            }
            ]
        })
    }

    static async createBatchWithUserRelation(){
        await prismaClient.sales.createMany({
            data: [
                {
                    id: "1",
                    name: "test1",
                    email: "test1@mail.com",
                    phone: "08123456789",
                    address: "jl. test no. 19"
                },
                {
                    id: "2",
                    name: "test2",
                    email: "test2@mail.com",
                    phone: "08123456788",
                    address: "jl. test no. 20"
                },
                {
                    id: "3",
                    name: "test3",
                    email: "test3@mail.com",
                    phone: "08123456787",
                    address: "jl. test no. 21"
                }
            ]
        })
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                username: "test"
            }
        })

        await prismaClient.userSales.createMany({
            data: [
                {
                    user_id: user.username,
                    sales_id: "1"
                },
                {
                    user_id: user.username,
                    sales_id: "2"
                },
                {
                    user_id: user.username,
                    sales_id: "3"
                }
            ]
        })
    }

    static async delete(){
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
    
    static async getAll(): Promise<Produk[]>{
        return await prismaClient.produk.findMany()
    }
}

export class TransaksiTest{
    static async delete(){
        const sales = await SalesTest.get()
        await prismaClient.transaksi.deleteMany({
            where: {
                sales_id: {
                   equals: sales.id 
                }
            }
        })
    }

    static async createBatch(){
        const produk = await ProdukTest.getAll()
        const sales = await SalesTest.get()
        const setoran = await SetoranTest.get()
        await prismaClient.transaksi.createManyAndReturn({
            data: [
                {
                    sales_id: sales.id,
                    produk_id: produk[0].id,
                    harga: produk[0].harga,
                    jumlah: 1,
                    total: produk[0].harga,
                    setoran_id: setoran.id
                },
                {
                    sales_id: sales.id,
                    produk_id: produk[1].id,
                    harga: produk[1].harga,
                    jumlah: 1,
                    total: produk[1].harga,
                    setoran_id: setoran.id
                },
                {
                    sales_id: sales.id,
                    produk_id: produk[2].id,
                    harga: produk[2].harga,
                    jumlah: 1,
                    total: produk[2].harga,
                    setoran_id: setoran.id
                }
            ]
        })
    }

    static async getAll(){
        const sales = await SalesTest.get()
        return await prismaClient.transaksi.findMany({
            where: {
                sales_id: sales.id
            }
        })
    }
}

export class SetoranTest{
    static async create(){
        const sales = await SalesTest.get()
        await prismaClient.setoran.create({
            data:{
                sales_id: sales.id,
                total: 1000000,
                setor: 1000000,
            }
        })
    }

    static async createBatch(){
        const sales = await SalesTest.get()
        await prismaClient.setoran.createMany({
            data: [
            {
            sales_id: sales.id,
            total: 1000000,
            setor: 900000,
            kekurangan: 100000
            },
            {
            sales_id: sales.id,
            total: 2000000,
            setor: 1800000,
            kekurangan: 200000
            },
            {
            sales_id: sales.id,
            total: 1500000,
            setor: 1400000,
            kekurangan: 100000
            },
            {
            sales_id: sales.id,
            total: 2500000,
            setor: 2300000,
            kekurangan: 200000
            },
            {
            sales_id: sales.id,
            total: 3000000,
            setor: 2900000,
            kekurangan: 100000
            },
            ]
        })
    }

    static async delete(){
        const sales = await SalesTest.get()
        await prismaClient.setoran.deleteMany({
            where: {
                sales_id: {
                    equals: sales.id
                }
            }
        })
    }

    static async get(): Promise<Setoran>{
        const sales = await SalesTest.get()
        return await prismaClient.setoran.findFirstOrThrow({
            where: {
                sales_id: sales.id
            }
        })
    }
}