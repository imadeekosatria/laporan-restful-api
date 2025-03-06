import { HTTPException } from "hono/http-exception"
import { CreateTransaksiRequest, toTransaksiResponse, TransaksiResponse } from "../model/transaksi-model"
import { TransaksiValidation } from "../validation/transaksi-validation"

import { prismaClient } from "../app/database"

export class TransaksiServices {
    static async create(request: CreateTransaksiRequest[]){

        const transaksi = TransaksiValidation.CREATE_ARRAY.parse(request)

        const response = await prismaClient.transaksi.createMany({
            data: transaksi
        })

        
        return response
    }
    
    static async get(laporanId: string): Promise<any> {
        return laporanId
    }

    static async getAll(): Promise<any[]> {
        return []
    }

    static async update(request: any): Promise<any> {
        return request
    }

    static async delete(laporanId: string): Promise<Boolean> {
        return true
    }
}