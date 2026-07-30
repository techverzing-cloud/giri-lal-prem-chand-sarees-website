import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
  id?: string
}

export function Container({ children, className, as: Tag = 'div', id }: ContainerProps) {
  return (
    <Tag id={id} className={cn('mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16', className)}>
      {children}
    </Tag>
  )
}
