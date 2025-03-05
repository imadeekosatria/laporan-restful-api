import { HTTPException } from "hono/http-exception"
import { prismaClient } from "../app/database"
import { CreateProdukRequest, ProdukResponse, toProdukResponse, UpdateProdukRequest } from "../model/produk-model";
import { ProdukValidation } from "../validation/produk-validation";
import { Produk } from "@prisma/client";

export class ProdukServices {
    static async create(request: CreateProdukRequest): Promise<ProdukResponse> {
        request = ProdukValidation.CREATE.parse(request)

        await this.produkAlreadyExist(request.name)

        const produk = await prismaClient.produk.create({
            data: request
        })

        return toProdukResponse(produk)
    }
    
    static async get(produkId: string): Promise<ProdukResponse> {
        const id = ProdukValidation.GET.parse(produkId)
        const produkData = await this.produkMustExist(id)
        
        return toProdukResponse(produkData)
    }

    static async produkMustExist(id: string): Promise<Produk> {
        const produkData = await prismaClient.produk.findFirst({
            where: {
                id: id
            }
        })

        if (!produkData) {
            throw new HTTPException(404, {
                message: "Produk is not found"
            })
        }

        return produkData
    }
    static async getAll(): Promise<ProdukResponse[]> {
        const produks = await prismaClient.produk.findMany()

        if (produks.length === 0) {
            throw new HTTPException(404, {
                message: "Produk not found"
            })
        }

        return produks.map(toProdukResponse)
    }
    static async update(request: UpdateProdukRequest): Promise<ProdukResponse> {
        request = ProdukValidation.UPDATE.parse(request)
        const produkData = await this.produkMustExist(request.id)
        
        if (!produkData) {
            throw new HTTPException(404, {
                message: "Produk is not found"
            })
        }
        
        const response = await prismaClient.produk.update({
            where: {
                id: request.id
            },
            data: request
        })

        return toProdukResponse(response)

    }
    static async delete(produkId: string): Promise<Boolean> {
        const id = ProdukValidation.GET.parse(produkId)
        const produkData = await this.produkMustExist(id)

        if (!produkData.id) {
            throw new HTTPException(404, {
                message: "Produk is not found"
            })
        }
        
        await prismaClient.produk.delete({
            where: {
                id: id
            }
        })

        return true
    }

    static async produkAlreadyExist(name: string | undefined): Promise<void> {
        const produk = await prismaClient.produk.findFirst({
            where: {
                name: name
            }
        })

        if (produk) {
            throw new HTTPException(400, {
                message: "Produk already exist"
            })
        }
    }
}