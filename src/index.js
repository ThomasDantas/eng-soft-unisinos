import Knex from 'knex'
import { createServer } from 'http'
import express, { urlencoded, json } from 'express'
import cors from 'cors'
import 'dotenv/config'

import usuarioRoute from './routes/usuario-route.js'

const app = express()
app.use(cors({ origin: true }))

app.use(urlencoded({ limit: '1gb', extended: true }))
app.use(json({ limit: '1gb' }))
app.disable('x-powered-by')


// =============== Globais
global.SALT_KEY = process.env.SECRET

// =============== Server
const port = process.env.PORT
app.set('port', port)

const server = createServer(app)
server.timeout = 3600000
server.listen(port)

// =============== Carrega as Rotas
app.use('/usuario', usuarioRoute)

// =============== Conexao banco Oracle
const connectionDb = () => {
  const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: '5432',
    ssl: {
      rejectUnauthorized: false,
    },
  };
  const knex = Knex({
    client: 'pg',
    connection: config,
    debug: false,
  });
  return knex
}
export const knex = connectionDb()
console.log(`========RUNNING PROD - at port ${port}========`)
