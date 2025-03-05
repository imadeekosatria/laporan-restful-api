import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { userController } from './controller/user-controller'
import { salesController } from './controller/sales-controller'
import { produkController } from './controller/produk-controller'
import { transaksiController } from './controller/transaksi-controller'
import { setoranController } from './controller/setoran-controller'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userController)
app.route('/', salesController)
app.route('/', produkController)
app.route('/', transaksiController)
app.route('/', setoranController)

app.post('/api/test', async(c) => {
  const request = await c.req.json()
  console.log(request)
  return c.json({
    data: request
  })
})

app.get('/api/setoran', async (c) => {
  const dataJson = Bun.file('data.json')
  const data = await dataJson.json()
  return c.json(data)
})

app.onError(async (error, c)=>{
  if (error instanceof HTTPException) {
    c.status(error.status)

    return c.json({
      errors: error.message
    })
  }else if(error instanceof ZodError){
    c.status(400)
    return c.json({
      errors: error.message
    })
  }else{
    c.status(500)
    return c.json({
      errors: error.message
    })
  }
})
export default app
