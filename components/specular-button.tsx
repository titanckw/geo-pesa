'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type SpecularButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  tone?: 'gold' | 'light'
}

export default function SpecularButton({ children, className = '', tone = 'gold', ...props }: SpecularButtonProps) {
  return (
    <button className={`specular-button specular-button-${tone} ${className}`} {...props}>
      <span className="specular-button-shine" aria-hidden="true" />
      <span className="specular-button-label">{children}</span>
    </button>
  )
}
