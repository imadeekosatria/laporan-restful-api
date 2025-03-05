import { afterEach, beforeEach, describe, expect, it,  } from 'bun:test'
import { ProdukTest, SalesTest, SetoranTest, TransaksiTest, UserTest } from './test-util'
import app from '../src'
import { logger } from '../src/app/logging'


describe('POST /api/transaksi', () => {
    beforeEach(async ()=>{
        await ProdukTest.createBatch()
        await SalesTest.create()
        await UserTest.create()
        await SetoranTest.create()
    })
    afterEach(async ()=>{
        await TransaksiTest.delete()
        await SetoranTest.delete()
        await SalesTest.delete()
        await ProdukTest.deleteAll()
        await UserTest.delete()
    })

    it('should successfully create new transaksi', async () => {
        const sales = await SalesTest.get()
        const setoran = await SetoranTest.get()
        const produk = await ProdukTest.getAll()

        const transaksiData = produk.map(produk => {
            const jumlah = Math.floor((Math.random() * 9) + 1)
            const harga = Number(produk.harga)
            const total = jumlah * harga
            return {
                sales_id: sales.id,
                produk_id: produk.id,
                setoran_id: setoran.id,
                harga: harga,
                jumlah: jumlah,
                total: total,
            }
        })

        const response = await app.request('/api/transaksi', {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            },
            body: JSON.stringify(transaksiData)
        })

        expect(response.status).toBe(200)
        const body = await response.json()
        logger.debug(body)
        expect(body.data).toBeDefined()
    })
})