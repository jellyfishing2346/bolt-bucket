import React, { useEffect, useState } from 'react'
import { getOptions, createItem } from '../services/ItemsAPI'
import OptionSelector from '../components/OptionSelector'
import VisualPreview from '../components/VisualPreview'
import { calcTotalPrice } from '../utilities/calcPrice'

export default function CreateItem({ onNavigate }) {
  const [options, setOptions] = useState([])
  const [byCategory, setByCategory] = useState({})
  const [name, setName] = useState('')
  const [selections, setSelections] = useState({})

  useEffect(() => {
    getOptions().then(data => {
      setOptions(data)
      const group = {}
      for (const o of data) {
        group[o.category] = group[o.category] || []
        group[o.category].push(o)
      }
      setByCategory(group)
      // initialize defaults
      const initial = {}
      for (const cat of Object.keys(group)) {
        initial[cat] = group[cat][0].key
      }
      setSelections(initial)
    }).catch(err => {
      console.error('Failed to load options', err)
    })
  }, [])

  const total = calcTotalPrice(selections, options)

  function handleChange(cat, key) {
    setSelections(prev => ({ ...prev, [cat]: key }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await createItem({ name, selections, total_price: total })
      onNavigate('list')
    } catch (err) {
      // show backend error to user
      const msg = err?.response?.data?.error || 'Failed to create'
      alert(msg)
    }
  }

  if (options.length === 0) return <div>Loading options...</div>

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <label>
            Name
            <br />
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>

          {Object.entries(byCategory).map(([cat, opts]) => (
            <OptionSelector
              key={cat}
              category={cat}
              options={opts}
              value={selections[cat]}
              onChange={handleChange}
            />
          ))}

          <div style={{ marginTop: 12 }}>
            <strong>Total: ${total}</strong>
          </div>

          <div style={{ marginTop: 12 }}>
            <button type="submit">Save Item</button>
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
