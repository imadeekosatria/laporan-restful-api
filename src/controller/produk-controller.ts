import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateProdukRequest } from "../model/produk-model";
import { ProdukServices } from "../services/produk-services";

export const produkController = new Hono<{ Variables: ApplicationVariables}>()

produkController.use(authMiddleware)

produkController.get('/api/produk', async (c) => {
    const response = await ProdukServices.getAll()
    return c.json({
        data: response
    })
})

produkController.post('/api/produk', async (c) => {
    const request = await c.req.json() as CreateProdukRequest

    const response = await ProdukServices.create(request)

    return c.json({
        data: response
    })
})

produkController.put('/api/produk/:id', async (c) => {
    return c.json({
        data: 'produk'
    })
})

produkController.delete('/api/produk/:id', async (c) => {
    return c.json({
        data: 'produk'
    })
})