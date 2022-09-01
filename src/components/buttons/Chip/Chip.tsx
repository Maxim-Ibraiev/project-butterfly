import { ButtonHTMLAttributes } from 'react'
import s from './Chip.module.scss'

function Chip({ children, ...buttonAttributes }: ButtonHTMLAttributes<HTMLElement>) {
  return (
    <button type="button" className={s.chip} {...buttonAttributes}>
      {children}
    </button>
  )
}

export default Chip
