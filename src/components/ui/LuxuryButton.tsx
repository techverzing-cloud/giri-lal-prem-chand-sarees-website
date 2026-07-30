import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center overflow-hidden font-body font-semibold transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-light active:bg-primary-dark',
        secondary:
          'bg-secondary text-night hover:bg-secondary-dark active:bg-secondary-dark',
        outline:
          'border-2 border-night bg-transparent text-night hover:bg-night hover:text-white',
        outlineLight:
          'border-2 border-white bg-transparent text-white hover:bg-white hover:text-night',
        ghost:
          'bg-transparent text-night hover:bg-night/5',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-5 py-2 text-xs tracking-widest',
        md: 'px-8 py-3 text-sm tracking-widest',
        lg: 'px-10 py-4 text-sm tracking-widest',
        xl: 'px-12 py-5 text-base tracking-widest',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

interface LuxuryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineLight' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant, size, fullWidth, children, icon, iconPosition = 'right', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        aria-disabled={props.disabled}
        role="button"
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        <span className="relative z-10 flex items-center gap-3">
          {icon && iconPosition === 'left' && <span className="size-4">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="size-4">{icon}</span>}
        </span>
        <span className="absolute inset-0 -z-0 translate-y-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0" />
      </motion.button>
    )
  }
)

LuxuryButton.displayName = 'LuxuryButton'
