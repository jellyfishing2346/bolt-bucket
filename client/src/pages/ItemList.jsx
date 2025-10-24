import React, { useEffect, useState } from 'react'
import { getAllItems, deleteItem } from '../services/ItemsAPI'

export default function ItemList({ onNavigate }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    refresh()
  }, [])

  function refresh() {
    getAllItems().then(setItems).catch(console.error)
  }

  async function handleDelete(id) {
    if (!confirm('Delete item?')) return
    await deleteItem(id)
    refresh()
  }

  return (
    <div>
      <h2>Saved Items</h2>
      {items.length === 0 && <div>No items yet</div>}
      <ul>
        {items.map(it => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            <strong>{it.name}</strong> — ${it.total_price}
            <button style={{ marginLeft: 8 }} onClick={() => onNavigate('detail', { id: it.id })}>View</button>
            <button style={{ marginLeft: 8 }} onClick={() => onNavigate('edit', { id: it.id })}>Edit</button>
            <button style={{ marginLeft: 8 }} onClick={() => handleDelete(it.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
