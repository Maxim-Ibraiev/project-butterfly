import React from 'react'
import s from './HeaderBtn.module.scss'

interface Props {
  src: string
  ariaLabel: string
  className?: string
  fill?: string
  handleClick: () => void
}

const HederBtn: React.FC<Props> = ({
  src,
  className = '',
  fill = '#fff',
  ariaLabel,
  children,
  handleClick,
}) => (
  <button
    className={`${s.wrapper} ${className}`}
    type="button"
    onClick={handleClick}
    aria-label={ariaLabel}
  >
    {children}
    {src && <span style={{ backgroundImage: src && `url(${src})`, fill }} className={s.icon} />}
  </button>
)

export default HederBtn
