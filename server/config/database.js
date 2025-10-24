import pg from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load the .env file next to the server folder regardless of process cwd.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

// Allow disabling SSL for environments that don't support it by setting PGSSLMODE=disable
const useSsl = process.env.PGSSLMODE !== 'disable'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: useSsl ? { rejectUnauthorized: false } : false
}

console.log('Postgres config: host=', process.env.PGHOST, ' ssl=', useSsl)

export const pool = new pg.Pool(config)

// simple helper to query
export async function query(text, params) {
  return pool.query(text, params)
}
