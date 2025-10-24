import React from 'react'

export default function VisualPreview({ selections }) {
  const color = selections.exterior || selections.color || 'neutral'
  const wheels = selections.wheels === 'sport' ? 'Sport' : 'Standard'
  const interior = selections.interior === 'leather' ? 'Leather' : 'Cloth'

  const colorBadge = {
    red: '🔴',
    blue: '🔵',
    black: '⚫',
    neutral: '⚪'
  }[color] || '⚪'

  return (
    <div className="text-center">
      <div className="text-6xl">{colorBadge}</div>
      <div className="mt-2 text-sm text-white/80">{wheels} • {interior}</div>
    </div>
  )
}
