import React from 'react'

export default function CustomizerTabs({ convertible, setConvertible, tabs, active, setActive }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={convertible} onChange={e => setConvertible(e.target.checked)} className="accent-brand" />
        Convertible
      </label>

      <div className="flex gap-3">
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)} className={`px-3 py-2 rounded-md ${active===t? 'bg-white/10 border border-brand': 'bg-transparent'} text-white`}>{t}</button>
        ))}
      </div>
    </div>
  )
}
