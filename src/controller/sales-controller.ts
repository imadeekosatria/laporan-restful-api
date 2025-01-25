import { Hono } from "hono";
import { CreateSaleRequest, UpdateSaleRequest } from "../model/sales-model";
import { SalesServices } from "../services/sales-services";
import { authMiddleware } from "../middleware/auth-middleware";
import { ApplicationVariables } from "../model/app-model";
import { Sales } from "@prisma/client";

export const salesController = new Hono<{ Variables: ApplicationVariables }>()


salesController.use(authMiddleware)
salesController.post('/api/sales', async (c) =>{
    const request = await c.req.json() as CreateSaleRequest
    
    const response = await SalesServices.create(request)
    
    return c.json({
        data: response
    })
})

salesController.get('/api/sales/:id', async (c) =>{
    const salesId = String(c.req.param('id'))

    const response = await SalesServices.get(salesId)

    return c.json({
        data: response
    })
})

salesController.put('/api/sales/:id', async (c) =>{
    const salesId = String(c.req.param('id'))
    
    const request = await c.req.json() as UpdateSaleRequest
    
    request.id = salesId
    
    const response = await SalesServices.update(request)

    return c.json({
        data: response
    })
})