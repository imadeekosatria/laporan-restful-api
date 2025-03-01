import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { ProdukTest, UserTest } from './test-util'
import app from '../src'
import { logger } from '../src/app/logging'

describe('GET /api/produk', () => {
    beforeEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.create()
        await ProdukTest.createBatch()
    })

    afterEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.delete()
    })

    it('should succes if produk request is valid', async () => {
        const response = await app.request('/api/produk', {
            method: 'GET',
            headers: {
                'Authorization': 'test'
            }
        })
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })


})

describe('POST /api/produk', () => {
    beforeEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.create()
    })

    afterEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.delete()
    })

    it('should succes if produk request is valid', async () => {
        const response = await app.request('/api/produk', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                harga: 10000,
                stok: 10
            })
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
        expect(body.data.name).toBe('test')
    })
})