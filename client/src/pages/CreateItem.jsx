import React, { useEffect, useMemo, useState } from 'react'
import { getOptions, createItem } from '../services/ItemsAPI'
import OptionGrid from '../components/OptionGrid'
import VisualPreview from '../components/VisualPreview'
import CustomizerTabs from '../components/CustomizerTabs'
import { calcTotalPrice } from '../utilities/calcPrice'

const TABS = ['EXTERIOR','ROOF','WHEELS','INTERIOR']

// Example incompatible rules (client-side): if interior=leather then wheels 'standard' is incompatible
const INCOMPATIBILITIES = [
  { if: { interior: 'leather' }, cannotBe: { wheels: ['standard'] } },
]

export default function CreateItem({ onNavigate }) {
  const [opts, setOpts] = useState([])
  const [byCategory, setByCategory] = useState({})
  const [name, setName] = useState('My New Car')
  const [selections, setSelections] = useState({})
  const [convertible, setConvertible] = useState(false)
  const [active, setActive] = useState('EXTERIOR')

  useEffect(() => {
    getOptions().then(data => {
      setOpts(data)
      const group = {}
      for (const o of data) {
        group[o.category] = group[o.category] || []
        group[o.category].push(o)
      }
      setByCategory(group)
      const initial = {}
      for (const cat of Object.keys(group)) {
        initial[cat] = group[cat][0].key
      }
      setSelections(initial)
    }).catch(err => console.error(err))
  }, [])

  const total = calcTotalPrice(selections, opts) + (convertible ? 2000 : 0)

  function handleSelect(cat, key) {
    setSelections(prev => ({ ...prev, [cat]: key }))
  }

  // client-side incompatibility calculation
  const disabled = useMemo(() => {
    const disabledMap = {}
    for (const rule of INCOMPATIBILITIES) {
      let match = true
      for (const [k,v] of Object.entries(rule.if)) {
        if (selections[k] !== v) match = false
      }
      if (match) {
        for (const [cat, keys] of Object.entries(rule.cannotBe)) {
          disabledMap[cat] = [...(disabledMap[cat]||[]), ...keys]
        }
      }
    }
    return disabledMap
  }, [selections])

  async function handleCreate(e) {
    e?.preventDefault()
    try {
      await createItem({ name, selections, total_price: total })
      onNavigate('list')
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to create'
      alert(msg)
    }
  }

  const currentOptions = byCategory[active.toLowerCase()] || []

  return (
    <div className="mx-auto max-w-6xl">
      <div className="card p-6 border border-brand">
        <CustomizerTabs convertible={convertible} setConvertible={setConvertible} tabs={TABS} active={active} setActive={setActive} />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-transparent border border-white/10 p-3 rounded-md text-white" />
            </div>

            <OptionGrid options={currentOptions} category={active.toLowerCase()} value={selections[active.toLowerCase()]} onSelect={handleSelect} disabledKeys={disabled[active.toLowerCase()]} />

            <div className="flex items-center justify-between mt-4">
              <button onClick={handleCreate} className="btn-brand px-6 py-2 rounded-md">CREATE</button>
              <button className="btn-brand px-4 py-2 rounded-md">DONE</button>
            </div>
          </div>

          <aside className="w-full md:w-72">
            <div className="card p-4">
              <h4 className="mb-4">Preview</h4>
              <VisualPreview selections={selections} />
            </div>
          </aside>
        </div>
      </div>
      {/* Floating price box bottom-left */}
      <div className="price-box">
        <span style={{ fontSize: 20 }}>💰</span>
        <div style={{ fontSize: 22 }}>${total}</div>
      </div>
    </div>
  )
}
