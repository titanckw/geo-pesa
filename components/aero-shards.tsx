'use client'

import { useRef } from 'react'

type AeroShardsProps = {
  className?: string
  backgroundColor?: string
  shardColor?: string
  accentColor?: string
}

const shards = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 37) % 84)}%`,
  top: `${6 + ((index * 61) % 82)}%`,
  width: `${18 + ((index * 13) % 42)}px`,
  height: `${54 + ((index * 17) % 90)}px`,
  rotate: `${-36 + ((index * 29) % 92)}deg`,
  delay: `${(index % 8) * -0.7}s`,
}))

export default function AeroShards({ className = '', backgroundColor = '#0B1626', shardColor = '#A9813F', accentColor = '#C9A868' }: AeroShardsProps) {
  const fieldRef = useRef<HTMLDivElement>(null)

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    fieldRef.current?.style.setProperty('--pointer-x', `${x}`)
    fieldRef.current?.style.setProperty('--pointer-y', `${y}`)
  }

  return (
    <div
      ref={fieldRef}
      className={`aero-shards ${className}`}
      style={{ '--aero-bg': backgroundColor, '--aero-shard': shardColor, '--aero-accent': accentColor } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      aria-hidden="true"
    >
      <div className="aero-shards__wash" />
      <div className="aero-shards__orbit aero-shards__orbit--one" />
      <div className="aero-shards__orbit aero-shards__orbit--two" />
      {shards.map((shard) => (
        <i key={shard.id} className="aero-shard" style={{ left: shard.left, top: shard.top, width: shard.width, height: shard.height, transform: `rotate(${shard.rotate})`, animationDelay: shard.delay }} />
      ))}
      <div className="aero-shards__grid" />
    </div>
  )
}
