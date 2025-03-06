import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";

export const setoranController = new Hono<{ Variables: ApplicationVariables}>()

setoranController.use(authMiddleware)

setoranController.get('/api/setoran', async (c) => {
    
    return c.json({
        data: "setoran"
    })
})

setoranController.get('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))

    return c.json({
        data: 'data'
    })
})

setoranController.post('/api/setoran', async (c) => {
    const request = await c.req.json()

    return c.json({
        data: request
    })
})

setoranController.put('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))

    const request = await c.req.json()

    return c.json({
        data: request
    })
})

setoranController.delete('/api/setoran/:id', async (c) => {
    const setoranId = String(c.req.param('id'))

    return c.json({
        data: setoranId
    })
})