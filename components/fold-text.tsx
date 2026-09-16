'use client'

import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SplitBy = 'char' | 'word' | 'line'
type Hinge = 'top' | 'bottom' | 'left' | 'right'

type FoldTextProps = {
  text: string
  splitBy?: SplitBy
  hinge?: Hinge
  duration?: number
  stagger?: number
  perspective?: number
  creaseShading?: number
  fontSize?: string | number
  fontWeight?: string | number
  color?: string
  className?: string
}

const hinges: Record<Hinge, { origin: string; rotateX: number; rotateY: number }> = {
  top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -92 },
}

export default function FoldText({
  text,
  splitBy = 'char',
  hinge = 'top',
  duration = 0.65,
  stagger = 0.045,
  perspective = 700,
  creaseShading = 0.55,
  fontSize = 'clamp(2rem, 4vw, 3.4rem)',
  fontWeight = 500,
  color = '#f7f4ec',
  className = '',
}: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const config = hinges[hinge]
  const pieces = useMemo(() => {
    if (splitBy === 'word') return text.split(/(\s+)/).map((part, index) => ({ part, key: index }))
    if (splitBy === 'line') return text.split('\n').map((part, index) => ({ part, key: index }))
    return Array.from(text).map((part, index) => ({ part, key: index }))
  }, [text, splitBy])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-fold-piece]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
    gsap.set(targets, { opacity: 0, rotateX: reduceMotion ? 0 : config.rotateX, rotateY: reduceMotion ? 0 : config.rotateY, transformOrigin: config.origin })
    timeline.to(targets, { opacity: 1, rotateX: 0, rotateY: 0, duration: reduceMotion ? 0.2 : duration, stagger: reduceMotion ? 0.02 : stagger, ease: reduceMotion ? 'power1.out' : 'power3.out', clearProps: 'transform' })
    return () => timeline.kill()
  }, [config, duration, stagger])

  const style = {
    '--fold-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    '--fold-font-weight': fontWeight,
    '--fold-color': color,
    '--fold-perspective': `${perspective}px`,
    '--fold-crease': creaseShading,
  } as CSSProperties

  return (
    <span ref={rootRef} className={`fold-text ${className}`} style={style} aria-label={text}>
      {pieces.map(({ part, key }) => splitBy === 'word' && /^\s+$/.test(part) ? <span key={key}>{part}</span> : <span className="fold-text-segment" key={key}><span data-fold-piece className="fold-text-piece">{part || '\u00a0'}</span></span>)}
    </span>
  )
}

export type { FoldTextProps }
