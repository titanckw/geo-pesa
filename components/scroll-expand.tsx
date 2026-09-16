'use client'

import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type ScrollExpandProps = {
  src?: string
  alt?: string
  title?: string
  scrollHint?: string
  startWidth?: number
  startHeight?: number
  startRadius?: number
  mediaZoom?: number
  scrollDistance?: number
  holdDistance?: number
  overlayScrim?: number
  children?: ReactNode
  className?: string
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0 || 1), 0, 1)
  return t * t * (3 - 2 * t)
}

export default function ScrollExpand({
  src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jw2E1ccfqz0dgKbDWBi3Njfw1OcuEa.png',
  alt = 'GeoPesa Financial Services Group',
  title = '',
  scrollHint = 'Scroll to explore',
  startWidth = 78,
  startHeight = 80,
  startRadius = 22,
  mediaZoom = 1.2,
  scrollDistance = 1,
  holdDistance = 0.15,
  overlayScrim = 0.42,
  children,
  className = '',
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current
    const image = imageRef.current
    if (!frame || !image) return
    const eased = smoothstep(0, 1, progress)
    const width = startWidth + (100 - startWidth) * eased
    const height = startHeight + (100 - startHeight) * eased
    const insetX = (100 - width) / 2
    const insetY = (100 - height) / 2
    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${startRadius * (1 - eased)}px)`
    image.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * eased})`
    if (scrimRef.current) scrimRef.current.style.opacity = String(overlayScrim * eased)
    if (contentRef.current) contentRef.current.style.opacity = String(smoothstep(0.62, 1, progress))
    if (hintRef.current) hintRef.current.style.opacity = String(1 - smoothstep(0, 0.18, progress))
  }, [mediaZoom, overlayScrim, startHeight, startRadius, startWidth])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    if (!root || !track || !stage) return
    let frame = 0
    const measure = () => {
      const height = root.clientHeight || 360
      stage.style.height = `${height}px`
      track.style.height = `${height * (1 + scrollDistance + holdDistance)}px`
      const progress = clamp(root.scrollTop / (height * Math.max(scrollDistance, 0.01)), 0, 1)
      applyProgress(progress)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    measure()
    root.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [applyProgress, holdDistance, scrollDistance])

  return <div ref={rootRef} className={`scroll-expand ${className}`}>
    <div ref={trackRef} className="scroll-expand__track">
      <div ref={stageRef} className="scroll-expand__stage">
        <div ref={frameRef} className="scroll-expand__frame">
          <img ref={imageRef} src={src} alt={alt} draggable={false} />
          <div ref={scrimRef} className="scroll-expand__scrim" />
          <div ref={contentRef} className="scroll-expand__content">{children}</div>
        </div>
        {title ? <h2 className="scroll-expand__title">{title}</h2> : null}
        <span ref={hintRef} className="scroll-expand__hint">{scrollHint}</span>
      </div>
    </div>
  </div>
}

export type { CSSProperties }
