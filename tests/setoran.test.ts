import { afterEach, beforeEach, describe, expect, it,  } from 'bun:test'
import { ProdukTest, SalesTest, SetoranTest, TransaksiTest, UserTest } from './test-util'
import app from '../src'
import { logger } from '../src/app/logging'

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

describe('GET /api/setoran/:id', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
        await ProdukTest.createBatch()
        await SetoranTest.create()
        await TransaksiTest.createBatch()
    })

    afterEach(async () => {
        await UserTest.delete()
        await TransaksiTest.delete()
        await SetoranTest.delete()
        await SalesTest.delete()
        await ProdukTest.deleteAll()
    })
    it('should return setoran by id with transaksi', async () => {
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
})

describe('PUT /api/setoran/:id', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
        await ProdukTest.createBatch()
        await SetoranTest.create()
        await TransaksiTest.createBatch()
    })

    afterEach(async () => {
        await UserTest.delete()
        await TransaksiTest.delete()
        await SetoranTest.delete()
        await SalesTest.delete()
        await ProdukTest.deleteAll()
    })

    it('should accept update if request is valid', async () => {
        const setoran = await SetoranTest.get()
        const transaksi = await TransaksiTest.getAll()
        const response = await app.request(`/api/setoran/${setoran.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                setoran: {
                    sales_id: String(setoran.sales_id),
                    total: 20000,
                    setor: 20000
                },
                transaksi: [
                    {
                        id: String(transaksi[0].id),
                        sales_id: String(transaksi[0].sales_id),
                        produk_id: String(transaksi[0].produk_id),
                        harga: Number(transaksi[0].harga),
                        jumlah: 2,
                        total: 20000,
                        setoran_id: String(setoran.id)
                    },
                    {
                        id: String(transaksi[1].id),
                        sales_id: String(transaksi[1].sales_id),
                        produk_id: String(transaksi[1].produk_id),
                        harga: Number(transaksi[1].harga),
                        jumlah: 1,
                        total: 10000,
                        setoran_id: String(setoran.id)
                    }
                ]
            })
        })
        logger.debug({setoran, transaksi})
        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined
    })
})

describe('DELETE /api/setoran/:id', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
        await ProdukTest.createBatch()
        await SetoranTest.create()
        await TransaksiTest.createBatch()
    })

    afterEach(async () => {
        await UserTest.delete()
        await TransaksiTest.delete()
        await SetoranTest.delete()
        await SalesTest.delete()
        await ProdukTest.deleteAll()
    })

    it('should accept if request is valid', async () => {
        const setoran = await SetoranTest.get()
        const response = await app.request(`/api/setoran/${setoran.id}`, {
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
})

describe('POST /api/setoran', () => {
    beforeEach(async () => {
        await UserTest.create()
        await SalesTest.create()
        await ProdukTest.createBatch()
    })

    afterEach(async () => {
        await UserTest.delete()
        await SetoranTest.delete()
        await TransaksiTest.delete()
        await ProdukTest.deleteAll()
        await SalesTest.delete()
    })
    it('should accept if request setoran and transaksi are valid', async () => {
        const sales = await SalesTest.get()
        const produk = await ProdukTest.getAll()

        const transaksiData = produk.map(produk => {
            const jumlah = Math.floor((Math.random() * 9) + 1)
            const harga = Number(produk.harga)
            const total = jumlah * harga
            return {
                sales_id: sales.id,
                produk_id: produk.id,
                harga: harga,
                jumlah: jumlah,
                total: total,
            }
        })

        const response = await app.request('/api/setoran', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify({
                setoran: {
                    sales_id: sales.id,
                    total: 100000,
                    setor: 100000
                },
                transaksi: transaksiData
            })
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined
    })
})