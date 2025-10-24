import { query } from '../config/database.js'

export async function getAllOptions(req, res) {
  try {
    const result = await query('SELECT * FROM options ORDER BY category, id')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch options' })
  }
}

export async function getOptionById(req, res) {
  const { id } = req.params
  try {
    const result = await query('SELECT * FROM options WHERE id=$1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch option' })
  }
}
