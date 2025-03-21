import { HTTPException } from "hono/http-exception"
import { CreateTransaksiRequest, toTransaksiResponse, toTransaksiResponses, TransaksiResponse, TransaksiResponses, UpdateTransaksiRequest } from "../model/transaksi-model"
import { TransaksiValidation } from "../validation/transaksi-validation"

import { prismaClient } from "../app/database"
import { SetoranValidation } from "../validation/setoran-validation"
import { Transaksi } from "@prisma/client"

export class TransaksiServices {
    static async create(request: CreateTransaksiRequest[]){

        const transaksi = TransaksiValidation.CREATE_ARRAY.parse(request)

        const response = await prismaClient.transaksi.createManyAndReturn({
            data: transaksi
        })

        if (!response) {
            throw new HTTPException(500, {
                message: "Internal server error"
            })
        }

        
        return toTransaksiResponses(response)
    }
    

    static async getAll(setoranId: string): Promise<TransaksiResponses> {
        const id = SetoranValidation.GET.parse(setoranId)
        const transaksis = await prismaClient.transaksi.findMany({
            where: {
                setoran_id: id
            }
        })

        if (transaksis.length === 0) {
            throw new HTTPException(404, {
                message: "Transaksi tidak ada, pastikan data setoran sudah ada"
            })
        }
        return toTransaksiResponses(transaksis)
    }

    static async update(setroanId: string, transaksi: UpdateTransaksiRequest[]): Promise<TransaksiResponses> {
        const id = SetoranValidation.GET.parse(setroanId)
        const transaksiData = TransaksiValidation.UPDATE_ARRAY.parse(transaksi)
        
        // Fetch existing transaksi records
        const existingTransaksis = await prismaClient.transaksi.findMany({
            where: {
                setoran_id: id
            }
        })
        

        // Update or create new transaksi records
        const updatedTransaksis = await Promise.all(transaksiData.map(async (transaksi: Transaksi) => {
            const existingTransaksi = existingTransaksis.find(t => t.id === transaksi.id)
            if (existingTransaksi) {
                // Update existing transaksi
                return prismaClient.transaksi.update({
                    where: { id: transaksi.id },
                    data: transaksi
                })
            } else {
                // Create new transaksi
                return prismaClient.transaksi.create({
                    data: { ...transaksi, setoran_id: id }
                })
            }
        }))

        // Delete transaksi records that are not in the update request
        const transaksiIdsToKeep = transaksiData.map((t: UpdateTransaksiRequest) => t.id)
        const transaksiIdsToDelete = existingTransaksis
            .filter(t => !transaksiIdsToKeep.includes(t.id))
            .map(t => t.id)

        await prismaClient.transaksi.deleteMany({
            where: {
                id: { in: transaksiIdsToDelete }
            }
        })

        return toTransaksiResponses(updatedTransaksis)
    }

    static async delete(setoranId: string): Promise<Boolean> {
        const id = SetoranValidation.GET.parse(setoranId)
        const transaksiData = await this.getAll(id)
        
        if (!transaksiData) {
            throw new HTTPException(404, {
                message: "Transaksi tidak ditemukan"
            })
        }

        await prismaClient.transaksi.deleteMany({
            where: {
                setoran_id: id
            }
        })

        return true
    }

    static async get(transaksi: string): Promise<TransaksiResponse> {
        const id = TransaksiValidation.GET.parse(transaksi)
        const transaksiData = await prismaClient.transaksi.findUniqueOrThrow({
            where: {
                id: id
            }
        })

        if (!transaksiData) {
            throw new HTTPException(404, {
                message: "Transaksi tidak ditemukan"
            })
        }

        return toTransaksiResponse(transaksiData)
    }
}