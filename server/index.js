import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import optionsRouter from './routes/optionsRoutes.js'
import itemsRouter from './routes/customItemsRoutes.js'
import { pool } from './config/database.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/options', optionsRouter)
app.use('/api/custom-items', itemsRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

// graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await pool.end()
  process.exit(0)
})
