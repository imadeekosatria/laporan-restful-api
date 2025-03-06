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

    it('should reject if user is not authenticated', async () => {
        const response = await app.request('/api/produk', {
            method: 'GET'
        })
        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
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

    it('should reject if user is not authenticated', async () => {
        const response = await app.request('/api/produk', {
            method: 'POST',
            body: JSON.stringify({
                name: "test",
                harga: 10000,
                stok: 10
            })
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if produk request is invalid', async () => {
        const response = await app.request('/api/produk', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                harga: "10000"
            })
        })

        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})

describe('PUT /api/produk/:id', () => {
    beforeEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.create()
        await ProdukTest.create()
    })

    afterEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.delete()
    })

    it('should succes if produk request is valid', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                harga: 10000,
                stok: 12
            })
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
        expect(body.data.stok).toEqual(12)
    })

    it('should reject if user is not authenticated', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: "test",
                harga: 10000,
                stok: 12
            })
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if produk request not found', async () => {
        const response = await app.request(`/api/produk/1`, {
            method: 'PUT',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                harga: 10000,
                stok: 12
            })
        })

        expect(response.status).toBe(404)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if produk request is invalid', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                harga: "10000"
            })
        })

        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should be pass if nothing change', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({})
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })
})

describe('GET /api/produk/:id', () => {
    beforeEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.create()
        await ProdukTest.create()
    })

    afterEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.delete()
    })

    it('should succes if produk request is valid', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
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

    it('should reject if user is not authenticated', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'GET'
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if produk request not found', async () => {
        const response = await app.request(`/api/produk/1`, {
            method: 'GET',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(404)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})

describe('DELETE /api/produk/:id', () => {
    beforeEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.create()
        await ProdukTest.create()
    })

    afterEach(async () => {
        await ProdukTest.deleteAll()
        await UserTest.delete()
    })

    it('should succes if produk request is valid', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })

    it('should reject if user is not authenticated', async () => {
        const produk = await ProdukTest.getByName()
        const response = await app.request(`/api/produk/${produk.id}`, {
            method: 'DELETE'
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if produk request not found', async () => {
        const response = await app.request(`/api/produk/1`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(404)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})