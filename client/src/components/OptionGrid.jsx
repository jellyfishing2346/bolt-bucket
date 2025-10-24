import React from 'react'

export default function OptionGrid({ options, category, value, onSelect, disabledKeys }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 border border-brand rounded-md">
      {options.map(opt => {
        const isSelected = value === opt.key
        const isDisabled = disabledKeys && disabledKeys.includes(opt.key)
        return (
          <div key={opt.key} className={`option-wrap card p-2 ${isSelected? 'option-selected': ''} ${isDisabled? 'opacity-50 pointer-events-none': ''}`} onClick={() => !isDisabled && onSelect(category, opt.key)}>
            <img className="option-img" src={`https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=600&q=60&${opt.key}`} alt={opt.label} />
            <div className="mt-2 text-sm flex items-center justify-between">
              <div>{opt.label}</div>
              <div className="text-red-300">{opt.price ? `+$${opt.price}` : ''}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
