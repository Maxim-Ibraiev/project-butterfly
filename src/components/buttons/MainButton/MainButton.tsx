import React, { MouseEvent } from 'react'
import cn from 'classnames'
import s from './MainButton.module.scss'

import { Request } from '../../../interfaces'

interface Props {
  isSubmit?: boolean
  status?: Request
  className?: string
  handleClick?: (event: MouseEvent) => void
}

const Button: React.FC<Props> = ({ children, className, handleClick, isSubmit, status }) => (
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
  >
    {children}
  </button>
)

export default Button
