import React, { useEffect, useState } from 'react'
import { getItem, deleteItem } from '../services/ItemsAPI'
import VisualPreview from '../components/VisualPreview'

export default function ItemDetail({ id, onNavigate }) {
  const [item, setItem] = useState(null)

  useEffect(() => {
    getItem(id).then(setItem).catch(console.error)
  }, [id])

  if (!item) return <div>Loading...</div>

  return (
    <div>
      <h2>{item.name}</h2>
      <div>Price: ${item.total_price}</div>
      <VisualPreview selections={item.selections} />
      <pre style={{ background: '#f4f4f4', padding: 12 }}>{JSON.stringify(item.selections, null, 2)}</pre>
      <div>
        <button onClick={() => onNavigate('edit', { id: item.id })}>Edit</button>
        <button onClick={async () => { if (confirm('Delete?')) { await deleteItem(item.id); onNavigate('list') } }}>Delete</button>
      </div>
    </div>
  )
}
