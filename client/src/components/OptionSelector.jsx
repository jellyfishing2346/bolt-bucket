import React from 'react'

export default function OptionSelector({ category, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <h4 style={{ margin: '6px 0' }}>{category}</h4>
      <div>
        {options.map((opt) => (
          <label key={opt.key} style={{ marginRight: 12 }}>
            <input
              type="radio"
              name={category}
              value={opt.key}
              checked={value === opt.key}
              onChange={() => onChange(category, opt.key)}
            />
            {opt.label} {opt.price ? `(+$${opt.price})` : ''}
          </label>
        ))}
      </div>
    </div>
  )
}
