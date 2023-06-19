
import express from 'express'
import {ProductManager} from './productManager.js'

    

const app = express()

app.use(express.json())

const productManager = new ProductManager('products.json')

const users =[]


//ANOTACIONES
//app.get('/api/user', (req,res)=>{
//    res.json(users)
//})
//
//app.post('/api/user', (req,res)=>{
//    const user = req.body
//
//    users.push(user)
//    res.status(201). json({status: 'success', message: 'user created'})
//})


app.get('/api/products/:id', async (req, res) => {
  const products = await productManager.getProducts()
  const sentById = req.params.id

  if (sentById) {
    const userFiltered = products.filter(u => u.id.toString().toLowerCase() === sentById.toLowerCase())
    return res.json(userFiltered)
  }

  res.json(products)
  }
)



app.get('/api/products', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit
    
    if (limit) {
        const limitValue = parseInt(limit)
    if (!isNaN(limitValue)) {
          const limitedProducts = products.slice(0, limitValue)
          
          return res.json(limitedProducts)
        }
      }
    
      res.json(products)
  }
)
  
  app.post('/api/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, id } = req.body
    
    await productManager.addProduct(title, description, price, thumbnail, code, stock, id)
    
    res.status(201).json({ status: 'success', message: 'product created' })
  }
)

app.listen(8080, () => {
    console.log('Servidor en funcionamiento en el puerto 8080')
  })