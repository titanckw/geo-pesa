'use client'

import { useEffect, useMemo, useState } from 'react'

type SplitFlapTextProps = {
  words?: string[]
  text?: string
  cycleDelay?: number
  fontSize?: number | string
  tileColor?: string
  textColor?: string
  gap?: number | string
  padTo?: number
  className?: string
}

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const css = `.split-flap{display:inline-flex;align-items:center;gap:var(--flap-gap);font-family:'SFMono-Regular','Roboto Mono',monospace;font-size:var(--flap-size)!important;font-weight:760;line-height:1;letter-spacing:.035em}.ticker-grid .split-flap,.ticker-grid .split-flap__tile,.ticker-grid .split-flap__char{font-size:var(--flap-size)!important}.split-flap__tile{position:relative;width:.78em;height:1.08em;font-size:1em;overflow:hidden;border-radius:6px;background:linear-gradient(180deg,color-mix(in srgb,var(--flap-tile) 82%,white),var(--flap-tile));box-shadow:inset 0 .035em .08em rgba(255,255,255,.12),inset 0 -.05em .1em rgba(0,0,0,.4),0 .16em .38em rgba(0,0,0,.22)}.split-flap__tile:before{content:'';position:absolute;z-index:2;top:50%;left:0;width:100%;height:1px;background:rgba(0,0,0,.55);box-shadow:0 -1px rgba(255,255,255,.12)}.split-flap__char{display:flex;align-items:center;justify-content:center;width:100%;height:200%;color:var(--flap-text);text-shadow:0 .06em .1em rgba(0,0,0,.35)}.split-flap__top,.split-flap__bottom{position:absolute;left:0;width:100%;height:50%;overflow:hidden}.split-flap__top{top:0}.split-flap__bottom{bottom:0}.split-flap__top .split-flap__char{position:absolute;top:0}.split-flap__bottom .split-flap__char{position:absolute;bottom:0}.split-flap__flip{position:absolute;z-index:3;left:0;width:100%;height:50%;overflow:hidden;backface-visibility:hidden}.split-flap__flip--front{top:0;transform-origin:bottom;animation:flap-front .12s ease-out both}.split-flap__flip--back{bottom:0;transform-origin:top;transform:rotateX(90deg);animation:flap-back .12s .06s ease-out both}@keyframes flap-front{to{transform:rotateX(-90deg)}}@keyframes flap-back{to{transform:rotateX(0)}}@media(prefers-reduced-motion:reduce){.split-flap__flip{animation:none;transform:none}}`

export default function SplitFlapText({ words = ['$300M', '14–17%', '3', '6+'], text, cycleDelay = 2600, fontSize = 31, tileColor = '#10233B', textColor = '#FCFBF7', gap = 4, padTo = 0, className = '' }: SplitFlapTextProps) {
  const phrases = useMemo(() => (text ? [text] : words.length ? words : ['$300M']), [text, words])
  const width = Math.max(padTo, ...phrases.map((phrase) => phrase.length))
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState(phrases[0].padEnd(width, ' '))

  useEffect(() => {
    setIndex(0)
    setDisplay(phrases[0].padEnd(width, ' '))
    if (phrases.length < 2) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % phrases.length), cycleDelay)
    return () => window.clearInterval(timer)
  }, [cycleDelay, phrases, width])

  useEffect(() => {
    const target = phrases[index].padEnd(width, ' ')
    setDisplay((current) => current.split('').map((char, tileIndex) => char === target[tileIndex] ? char : charset[Math.floor(Math.random() * charset.length)]).join(''))
    const timer = window.setTimeout(() => setDisplay(target), 140)
    return () => window.clearTimeout(timer)
  }, [index, phrases, width])

  return <><style>{css}</style><span className={`split-flap ${className}`} style={{ '--flap-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize, '--flap-gap': typeof gap === 'number' ? `${gap}px` : gap, '--flap-tile': tileColor, '--flap-text': textColor } as React.CSSProperties} role="text" aria-label={phrases[index]}>{display.split('').map((char, tileIndex) => <span className="split-flap__tile" key={`${tileIndex}-${char}`}><span className="split-flap__top"><span className="split-flap__char">{char === ' ' ? '\u00a0' : char}</span></span><span className="split-flap__bottom"><span className="split-flap__char">{char === ' ' ? '\u00a0' : char}</span></span></span>)}</span></>
}

void charset
