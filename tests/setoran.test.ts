import { afterEach, beforeEach, describe, expect, it,  } from 'bun:test'
import { SalesTest, SetoranTest, UserTest } from './test-util'
import app from '../src'
import { logger } from '../src/app/logging'

describe('POST /api/setoran', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
    })
    afterEach(async () => {
        await UserTest.delete()
        await SalesTest.delete()
    })

    it('should accept if request is valid', async () => {
        const sales = await SalesTest.get()
        console.log(sales)
        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                sales_id: sales.id,
                total: 100000,
                setor: 100000
            })
        })
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })

    it('should accept if kekurangan is provided', async () => {
        const sales = await SalesTest.get()

        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                sales_id: sales.id,
                total: 100000,
                setor: 50000,
                kekurangan: 50000
            })
        })
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })

    it('should reject if sales_id is not provided', async () => {
        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                total: 100000,
                setor: 100000
            })
        })
        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if total is not provided', async () => {
        const sales = await SalesTest.get()

        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                sales_id: sales.id,
                setor: 100000
            })
        })

        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if setor is not provided', async () => {
        const sales = await SalesTest.get()

        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization':'test'
            },
            body: JSON.stringify({
                sales_id: sales.id,
                total: 100000
            })
        })

        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should reject if total is less than setor', async () => {
        const sales = await SalesTest.get()

        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                sales_id: sales.id,
                total: 100000,
                setor: 200000
            })
        })

        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined
    })

    it('should reject if request is not authorized', async () => {
        const sales = await SalesTest.get()

        const response = await app.request('/api/setoran', {
            method: 'POST',
            body: JSON.stringify({
                sales_id: sales.id,
                total: 100000,
                setor: 100000
            })
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})

describe('GET /api/setoran', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
        await SetoranTest.createBatch()
    })
    afterEach(async () => {
        await UserTest.delete()
        await SetoranTest.delete()
        await SalesTest.delete()
    })

    it('should return all setoran', async () => {
        const response = await app.request('/api/setoran', {
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

    it('should return setoran by id', async () => {
        const setoran = await SetoranTest.get()
        const response = await app.request(`/api/setoran/${setoran.id}`, {
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

    it('should return setoran by sales_id', async () => {
        const sales = await SalesTest.get()
        const response = await app.request(`/api/setoran?sales=${sales.id}`, {
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

    it('should reject if request is not authorized', async () => {
        const response = await app.request('/api/setoran', {
            method: 'GET'
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})

describe('PUT /api/setoran', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
        await SetoranTest.create()
    })
    afterEach(async () => {
        await UserTest.delete()
        await SetoranTest.delete()
        await SalesTest.delete()
    })

    it('should accept if request is valid', async () => {
        const sales = await SalesTest.get()
        const setoran = await SetoranTest.get()
        console.log(setoran)
        const response = await app.request(`/api/setoran/${setoran.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                sales_id: sales.id,
                setor: 100000
            })
        })

        // expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        // expect(body.data).toBeDefined()
    })
})