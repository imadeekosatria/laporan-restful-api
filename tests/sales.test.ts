import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { SalesTest, UserTest } from './test-util'
import app from '../src'
import { logger } from '../src/app/logging'
import { prismaClient } from '../src/app/database'

describe('POST /api/sales', () => {
    beforeEach(async () => {
        await SalesTest.delete()
        await UserTest.create()
    })

    afterEach(async () => {
        await SalesTest.delete()
        await UserTest.delete()
    })

    it('should succes if sales is valid', async () => {
        const response = await app.request('/api/sales', {
            method: 'post',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                email: "test@mail.com",
                phone: "08123456789",
                address: "jl. test no. 19",
            })
        })
        
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })

    it('should fail if name is empty', async () => {
        const response = await app.request('/api/sales', {
            method: 'post',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "",
            })
        })

        expect(response.status).toBe(400)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should accept if only name is provided', async () => {
        const response = await app.request('/api/sales', {
            method: 'post',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
            })
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
        expect(body.data.name).toBe("test")
    })

    it('should fail if email already used by other sales', async () => {
        await SalesTest.create()
        const response = await app.request('/api/sales', {
            method: 'post',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                email: "test@mail.com",
                phone: "08123456789",
                address: "jl. test no. 19",
            })
        })
        
        expect(response.status).toBe(409)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })

    it('should fail if user is not SUPER_ADMIN', async () => {
        await UserTest.delete()
        await UserTest.createadmin()
        const response = await app.request('/api/sales', {
            method: 'post',
            headers:{
                'Authentication': 'test'
            },
            body: JSON.stringify({
                name: "test",
                email: "test@mail.com",
                phone: "08123456789",
                address: "jl. test no. 19",
            })
        })
        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})

describe('GET /api/sales/:id', () => {
    beforeEach(async () => {
        await SalesTest.delete()
        await UserTest.create()
        await SalesTest.create()
    })

    afterEach(async () => {
        await SalesTest.delete()
        await UserTest.delete()
    })
    it('should success if sales is found', async () => {
        const sales = await SalesTest.get()
        const response = await app.request('/api/sales/' + sales.id, {
            method: 'get',
            headers:{
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
    })

    it('should fail if sales is not found', async () => {
        const response = await app.request('/api/sales/1', {
            method: 'get',
            headers:{
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(404)
        const body = await response.json()
        logger.debug(body.errors)
    })

    it('should fail if not authorized', async () => {
        const sales = await SalesTest.get()
        const response = await app.request('/api/sales/' + sales.id, {
            method: 'get',
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body.errors)
    })
})

describe('PUT /api/sales/:id', () => {
    beforeEach(async () => {
        await SalesTest.delete()
        await UserTest.create()
        await SalesTest.create()
    })

    afterEach(async () => {
        await SalesTest.delete()
        await UserTest.delete()
    })

    it('should success if sales is valid', async () => {
        const sales = await SalesTest.get()
        const response = await app.request('/api/sales/' + sales.id, {
            method: 'put',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                email: "test2@mail.com",
                phone: "0812223333",
                address: "jl.test no. 20",
            })
        })
        
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(sales)
        logger.debug(body)
        expect(body.data).toBeDefined()
        expect(body.data.name).toBe("test")
        expect(body.data.email).toBe("test2@mail.com")
        expect(body.data.phone).toBe("0812223333")
        expect(body.data.address).toBe("jl.test no. 20")
    })

    it('should fail if email is already used', async () => {
        await prismaClient.sales.create({
            data:{
                name: "test2",
                email: "test2@mail.com"
            }
        })

        const sales = await SalesTest.get()
        const response = await app.request('/api/sales/' + sales.id, {
            method: 'put',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                email: "test2@mail.com",
                phone: "0812223333",
                address: "jl.test no. 20",
            })
        })

        expect(response.status).toBe(409)
        const body = await response.json()
        logger.debug(sales)
        logger.debug(body)
        expect(body.errors).toBeDefined()


        await prismaClient.sales.deleteMany({
            where: {
                name: "test2",
                email: "test2@mail.com"
            }
        });
    })

    it('should succes if email update is still same', async () => {
        const sales = await SalesTest.get()
        const response = await app.request('/api/sales/' + sales.id, {
            method: 'put',
            headers:{
                'Authorization': 'test'
            },
            body: JSON.stringify({
                name: "test",
                email: "test@mail.com",
                phone: "0812223333",
                address: "jl.test",
            })
        }) 
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(sales)
        logger.debug(body)
        expect(body.data).toBeDefined()
    })
})

describe('DELETE /api/sales/:id', () => {
    beforeEach(async () => {
        await SalesTest.delete()
        await UserTest.create()
        await SalesTest.create()
    })

    afterEach(async () => {
        await SalesTest.delete()
        await UserTest.delete()
    })

    it('should success delete sales if sales is found', async () => {
        const sales = await SalesTest.get()

        const response = await app.request('/api/sales/' + sales.id, {
            method: 'delete',
            headers:{
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(sales)
        logger.debug(body.data)
        expect(body.data).toBeTrue()

    })

    it('should be fail if sales is not found', async () => {
        const response = await app.request('/api/sales/1', {
            method: 'delete',
            headers:{
                'Authorization': 'test'
            },
        })

        expect(response.status).toBe(404)
        const body = await response.json()
        logger.debug(body.errors)
        expect(body.errors).toBeDefined()
    })

    it('should be fail if not authorized', async () => {
        const sales = await SalesTest.get()
        const response = await app.request('/api/sales/'+ sales.id, {
            method: 'delete'
        })

        expect(response.status).toBe(401)
        const body = await response.json()
        logger.debug(body.errors)
        expect(body.errors).toBeDefined()
    })
})

describe('GET /api/sales', () => {
    beforeEach(async () => {
        await SalesTest.delete()
        await UserTest.create()
        await SalesTest.create()
    })

    afterEach(async () => {
        await SalesTest.delete()
        await UserTest.delete()
    })

    it('should success get all sales', async () => {
        await prismaClient.sales.createMany({
            data: [
            {
                name: "test1",
                email: "test1@mail.com",
            },
            {
                name: "test2",
                email: "test2@mail.com",
            },
            {
                name: "test3",
                email: "test3@mail.com",
            },
            {
                name: "test4",
                email: "test4@mail.com",
            },
            {
                name: "test5",
                email: "test5@mail.com",
            }
            ]
        })
        const response = await app.request('/api/sales', {
            method: 'get',
            headers:{
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })

    it('should fail if there is no data', async () => {
        await SalesTest.delete()
        const response = await app.request('/api/sales', {
            method: 'get',
            headers:{
                'Authorization': 'test'
            }
        })

        expect(response.status).toBe(404)
        const body = await response.json()
        logger.debug(body)
        expect(body.errors).toBeDefined()
    })
})