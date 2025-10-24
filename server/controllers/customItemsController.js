import { query } from '../config/database.js'

// simple impossible-combo check: leather interior + cloth wheels (example)
function isImpossible(selections) {
  // Example rule: if color is 'invisible' and wheels are 'sport' (just demonstration)
  if (selections.color === 'invisible' && selections.wheels === 'sport') return true
  return false
}

export async function getAllItems(req, res) {
  try {
    const result = await query('SELECT * FROM custom_items ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
}

export async function getItem(req, res) {
  const { id } = req.params
  try {
    const result = await query('SELECT * FROM custom_items WHERE id=$1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch item' })
  }
}

export async function createItem(req, res) {
  const { name, selections, total_price } = req.body
  if (!name || !selections) return res.status(400).json({ error: 'Missing fields' })
  if (isImpossible(selections)) return res.status(400).json({ error: 'Impossible combination' })
  try {
    const result = await query(
      'INSERT INTO custom_items (name, selections, total_price) VALUES ($1,$2,$3) RETURNING *',
      [name, selections, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create item' })
  }
}

export async function updateItem(req, res) {
  const { id } = req.params
  const { name, selections, total_price } = req.body
  if (!name || !selections) return res.status(400).json({ error: 'Missing fields' })
  if (isImpossible(selections)) return res.status(400).json({ error: 'Impossible combination' })
  try {
    const result = await query(
      'UPDATE custom_items SET name=$1, selections=$2, total_price=$3 WHERE id=$4 RETURNING *',
      [name, selections, total_price, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update item' })
  }
}

export async function deleteItem(req, res) {
  const { id } = req.params
  try {
    await query('DELETE FROM custom_items WHERE id=$1', [id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete' })
  }
}
