import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateSetoranRequest } from "../model/setoran-model";
import { SetoranServices } from "../services/setoran-services";

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
    const request = await c.req.json() as CreateSetoranRequest

    const response = await SetoranServices.create(request)

    return c.json({
        data: response
    })
})

setoranController.put('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))

    const request = await c.req.json()

    request.id = setoranId

    const response = await SetoranServices.update(request)

    return c.json({
        data: response
    })
})

setoranController.delete('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))

    return c.json({
        data: setoranId
    })
})