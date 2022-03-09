import React, { MouseEvent } from 'react'
import cn from 'classnames'
import s from './MainButton.module.scss'
import { Request } from '../../../interfaces'

interface IProps {
  isSubmit?: boolean
  status?: Request
  className?: string
  width?: number
  handleClick?: (event: MouseEvent) => void
}

const Button: React.FC<IProps> = ({ children, className, handleClick, isSubmit, status, width }) => (
  <button
    className={cn(
      s.btn,
      {
        [s.error]: status === 'Error',
        [s.request]: status === 'Request',
        [s.success]: status === 'Success',
      },
      className
    )}
    type={isSubmit ? 'submit' : 'button'}
    onClick={handleClick}
    style={{ width }}
  >
    {children}
  </button>
)

export default Button
