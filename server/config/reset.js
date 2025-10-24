import { pool } from './database.js'

async function reset() {
  // Create tables: options, custom_items
  // options stores option choices for features (category, key, label, price)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS options (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      key TEXT NOT NULL,
      label TEXT NOT NULL,
      price NUMERIC DEFAULT 0
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS custom_items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      selections JSONB NOT NULL,
      total_price NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)

  // Seed some options if table empty
  const { rows } = await pool.query('SELECT COUNT(*)::int AS c FROM options')
  if (rows[0].c === 0) {
    const seed = [
      ['color','red','Red',100],
      ['color','blue','Blue',90],
      ['color','black','Black',80],
      ['wheels','standard','Standard',0],
      ['wheels','sport','Sport',250],
      ['interior','cloth','Cloth',0],
      ['interior','leather','Leather',500]
    ]
    for (const s of seed) {
      await pool.query('INSERT INTO options (category, key, label, price) VALUES ($1,$2,$3,$4)', s)
    }
    console.log('Seeded options')
  }
  console.log('Reset complete')
}

if (process.argv.includes('--run')) {
  reset()
    .then(() => process.exit(0))
    .catch(err => { console.error(err); process.exit(1) })
}

export default reset
