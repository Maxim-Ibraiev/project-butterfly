import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import s from './Chip.module.scss'

function Chip({ children, disabled, className, ...buttonAttributes }: ButtonHTMLAttributes<HTMLElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(s.chip, className, { [s.disabled]: disabled })}
      {...buttonAttributes}
    >
      {children}
    </button>
  )
}

export default Chip
