import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../app/database";
import { CreateProdukRequest, ProdukResponse, toProdukResponse } from "../model/produk-model";
import { ProdukValidation } from "../validation/produk-validation";

export class ProdukServices {
    static async create(request: CreateProdukRequest): Promise<ProdukResponse> {
        request = ProdukValidation.CREATE.parse(request)

        await this.produkAlreadyExist(request.name)

        const produk = await prismaClient.produk.create({
            data: request
        })

        return toProdukResponse(produk)
    }
    
    static async get(produkId) {
        throw new Error('Not implemented');
    }
    static async getAll() {
        const produks = await prismaClient.produk.findMany()

        if (produks.length === 0) {
            throw new HTTPException(404, {
                message: "Produk not found"
            })
        }

        return produks.map(toProdukResponse)
    }
    static async update(request) {
        throw new Error('Not implemented');
    }
    static async delete(produkId) {
        throw new Error('Not implemented');
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