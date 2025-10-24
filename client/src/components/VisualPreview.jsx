import React from 'react'

export default function VisualPreview({ selections }) {
  // Simple emoji-based preview for demo purposes
  const color = selections.color || 'neutral'
  const wheels = selections.wheels === 'sport' ? '🏎️' : '🚗'
  const interior = selections.interior === 'leather' ? '💺' : '🪑'

  const colorBadge = {
    red: '🔴',
    blue: '🔵',
    black: '⚫',
    neutral: '⚪'
  }[color] || '⚪'

  return (
    <div style={{ fontSize: 48 }}>
      <div>{colorBadge} {wheels}</div>
      <div style={{ fontSize: 18 }}>{interior}</div>
    </div>
  )
}
