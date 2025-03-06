import { HTTPException } from "hono/http-exception"
import { CreateSetoranRequest, SetoranResponse, toSetoranResponse } from "../model/setoran-model";
import { SetoranValidation } from "../validation/setoran-validation";
import { prismaClient } from "../app/database";
import { Setoran,  } from "@prisma/client";

export class SetoranServices {
    static async create(request: CreateSetoranRequest): Promise<SetoranResponse> {
        request = SetoranValidation.CREATE.parse(request)
        
        const setoran = await prismaClient.setoran.create({
            data: request
        })

        return toSetoranResponse(setoran) 
    }

    static async get(setoranId: string): Promise<SetoranResponse> {
        const id = SetoranValidation.GET.parse(setoranId)
        const setoranData = await this.setoranMustExist(id)

        return toSetoranResponse(setoranData)
    }

    static async getAll(): Promise<SetoranResponse[]> {
        const setorans = await prismaClient.setoran.findMany()

        if (setorans.length === 0) {
            throw new HTTPException(404, {
                message: "Setoran tidak ditemukan"
            })
        }

        return setorans.map(toSetoranResponse)
    }

    static async update(request: Setoran): Promise<SetoranResponse> {
        request = SetoranValidation.UPDATE.parse(request)

        const setoranData = await this.setoranMustExist(request.id)

        if (!setoranData) {
            throw new HTTPException(404, {
                message: "Setoran tidak ditemukan"
            })
        }

        const response = await prismaClient.setoran.update({
            where: {
                id: setoranData.id
            },
            data: request
        })

        return toSetoranResponse(response)
    }

    static async delete(setoranId: string): Promise<Boolean> {
        const id = SetoranValidation.DELETE.parse(setoranId)
        const setoranData = await this.setoranMustExist(id)

        if (!setoranData) {
            throw new HTTPException(404, {
                message: "Setoran tidak ditemukan"
            })
        }

        await prismaClient.setoran.delete({
            where: {
                id: id
            }
        })

        return true
    }

    static async setoranMustExist(id: string): Promise<Setoran> {
        const setoranData = await prismaClient.setoran.findFirst({
            where: {
                id: id
            }
        })

        if (!setoranData) {
            throw new HTTPException(404, {
                message: "Setoran tidak ditemukan"
            })
        }

        return setoranData
    }

    static async setoranAlreadyExist(id: string | undefined): Promise<void> {
        const setoranData = await prismaClient.setoran.findFirst({
            where: {
                id: id
            }
        })
        if (setoranData) {
            throw new HTTPException(400, {
                message: "Setoran already exist"
            })
        }
    }
}