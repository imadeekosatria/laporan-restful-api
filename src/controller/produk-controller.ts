import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateProdukRequest, UpdateProdukRequest } from "../model/produk-model";
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

produkController.get('/api/produk/:id', async (c) => {
    const produkId = String(c.req.param('id'))

    const response = await ProdukServices.get(produkId)

    return c.json({
        data: response
    })
})

produkController.put('/api/produk/:id', async (c) => {
    const produkId = String(c.req.param('id'))

    const request = await c.req.json() as UpdateProdukRequest

    request.id = produkId

    const response = await ProdukServices.update(request)

    return c.json({
        data: response
    })
})

produkController.delete('/api/produk/:id', async (c) => {
    const produkId = String(c.req.param('id'))

    const response = await ProdukServices.delete(produkId)

    return c.json({
        data: response
    })
})