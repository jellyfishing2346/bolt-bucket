import React, { useEffect, useState } from 'react'
import { getOptions, getItem, updateItem } from '../services/ItemsAPI'
import OptionSelector from '../components/OptionSelector'
import VisualPreview from '../components/VisualPreview'
import { calcTotalPrice } from '../utilities/calcPrice'

export default function EditItem({ id, onNavigate }) {
  const [options, setOptions] = useState([])
  const [byCategory, setByCategory] = useState({})
  const [item, setItem] = useState(null)
  const [selections, setSelections] = useState({})
  const [name, setName] = useState('')

  useEffect(() => {
    Promise.all([getOptions(), getItem(id)]).then(([opts, it]) => {
      setOptions(opts)
      const group = {}
      for (const o of opts) {
        group[o.category] = group[o.category] || []
        group[o.category].push(o)
      }
      setByCategory(group)
      setItem(it)
      setSelections(it.selections)
      setName(it.name)
    }).catch(console.error)
  }, [id])

  const total = calcTotalPrice(selections, options)

  function handleChange(cat, key) {
    setSelections(prev => ({ ...prev, [cat]: key }))
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      await updateItem(id, { name, selections, total_price: total })
      onNavigate('detail', { id })
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to update'
      alert(msg)
    }
  }

  if (!item || options.length === 0) return <div>Loading...</div>

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <label>
            Name
            <br />
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>

          {Object.entries(byCategory).map(([cat, opts]) => (
            <OptionSelector key={cat} category={cat} options={opts} value={selections[cat]} onChange={handleChange} />
          ))}

          <div style={{ marginTop: 12 }}>
            <strong>Total: ${total}</strong>
          </div>

          <div style={{ marginTop: 12 }}>
            <button type="submit">Save Changes</button>
          </div>
        </div>

        <aside style={{ width: 240 }}>
          <h4>Preview</h4>
          <VisualPreview selections={selections} />
        </aside>
      </form>
    </div>
  )
}
