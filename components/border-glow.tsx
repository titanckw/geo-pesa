'use client'

import { useCallback, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

interface BorderGlowProps {
  children: ReactNode
  className?: string
  backgroundColor?: string
  borderRadius?: number
  glowColor?: string
  glowRadius?: number
  glowIntensity?: number
  colors?: string[]
}

function parseHsl(value: string) {
  const [h = 40, s = 80, l = 80] = value.split(/\s+/).map(Number)
  return `${h}deg ${s}% ${l}%`
}

export default function BorderGlow({
  children,
  className = '',
  backgroundColor = '#10233B',
  borderRadius = 20,
  glowColor = '40 80 80',
  glowRadius = 30,
  glowIntensity = 1,
  colors = ['#A9813F', '#C9A868', '#6B7A93'],
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pointer, setPointer] = useState({ x: 50, y: 50, active: false })
  const shadow = `0 0 ${Math.round(12 * glowIntensity)}px hsl(${parseHsl(glowColor)} / 70%), 0 0 ${Math.round(glowRadius * glowIntensity)}px hsl(${parseHsl(glowColor)} / 35%)`

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }, [])

  return (
    <div
      ref={ref}
      className={`border-glow ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setPointer((current) => ({ ...current, active: true }))}
      onPointerLeave={() => setPointer((current) => ({ ...current, active: false }))}
      style={{
        '--glow-x': `${pointer.x}%`,
        '--glow-y': `${pointer.y}%`,
        '--glow-shadow': pointer.active ? shadow : 'none',
        '--glow-border': `linear-gradient(135deg, ${colors.join(', ')})`,
        '--glow-bg': backgroundColor,
        '--glow-radius': `${borderRadius}px`,
      } as CSSProperties}
    >
      <div className="border-glow-content">{children}</div>
    </div>
  )
}

