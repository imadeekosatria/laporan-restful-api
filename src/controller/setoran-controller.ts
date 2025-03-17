import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateSetoranRequest } from "../model/setoran-model";
import { SetoranServices } from "../services/setoran-services";
import { TransaksiServices } from "../services/transaksi-services";
import { CreateTransaksiRequest } from "../model/transaksi-model";

export const setoranController = new Hono<{ Variables: ApplicationVariables}>()

setoranController.use(authMiddleware)

setoranController.get('/api/setoran', async (c) => {
    const salesId = c.req.query('sales')
    let response
    if (salesId) {
        response = await SetoranServices.getBySalesId(String(salesId))
    }else{
        response = await SetoranServices.getAll() 
    }
    return c.json({
        data: response
    })
})

setoranController.get('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))
    const response = await SetoranServices.get(setoranId)

    return c.json({
        data: response
    })
})

setoranController.post('/api/setoran', async (c) => {
    const request = await c.req.json() 

    const setoran = request.setoran as CreateSetoranRequest

    const transaksi = request.transaksi as CreateTransaksiRequest[]

    const response_setoran = await SetoranServices.create(setoran)

    const setoran_id = response_setoran.id

    transaksi.forEach(t => {
        t.setoran_id = setoran_id
    })

    const response_transaksi = await TransaksiServices.create(transaksi)

    return c.json({
        data: {
            setoran: response_setoran,
            transaksi: response_transaksi
        }
    })
})

setoranController.put('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))

    const request = await c.req.json()

    const setoran = request.setoran

    const transaksi = request.transaksi

    const transaksi_response = await TransaksiServices.update(setoranId, transaksi)
    
    setoran.id = setoranId

    const setoran_response = await SetoranServices.update(setoran)

    return c.json({
        data: {
            setoran: setoran_response,
            transaksi: transaksi_response
        }
    })
})

setoranController.delete('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))
    const response = await SetoranServices.delete(setoranId)

    return c.json({
        data: response
    })
})