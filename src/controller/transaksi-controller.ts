import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateTransaksiRequest, UpdateTransaksiRequest } from "../model/transaksi-model";
import { TransaksiServices } from "../services/transaksi-services";

export const transaksiController = new Hono<{ Variables: ApplicationVariables}>   

transaksiController.use(authMiddleware)

transaksiController.get('/api/transaksi', async (c) => {
    const response = TransaksiServices.getAll()
    return c.json({
        data: response
    })
})

transaksiController.get('/api/transaksi/:id', async (c) => {
    const transaksiId = String(c.req.param('id'))

    const response = TransaksiServices.get(transaksiId)

    return c.json({
        data: response
    })
})

transaksiController.post('/api/transaksi', async (c) => {
    const request = await c.req.json() as CreateTransaksiRequest[]

    const response = TransaksiServices.create(request)
    return c.json({
        data: response
    })
})

transaksiController.put('/api/transaksi/:id', async (c) => {
    const transaksiId = String(c.req.param('id'))

    const request = await c.req.json() as UpdateTransaksiRequest

    request.id = transaksiId

    const response = TransaksiServices.update(request)

    return c.json({
        data: response
    })
})

transaksiController.delete('/api/transaksi/:id', async (c) => {
    const transaksiId = String(c.req.param('id'))

    const response = TransaksiServices.delete(transaksiId)
    
    return c.json({
        data: response
    })
})