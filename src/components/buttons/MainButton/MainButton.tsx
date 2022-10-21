import React, { MouseEvent } from 'react'
import cn from 'classnames'
import { Request } from '../../../interfaces'
import { LoadingIcon } from '../../icons'
import s from './MainButton.module.scss'

interface IProps {
  isSubmit?: boolean
  status?: Request
  className?: string
  width?: number
  isLoading?: boolean
  handleClick?: (event: MouseEvent) => void
}

const Button: React.FC<IProps> = ({
  children,
  className,
  handleClick,
  isSubmit,
  status,
  width,
  isLoading,
}) => {
  const isShowLoading = isLoading || status === 'Request'

  return (
    <button
      className={cn(
        s.btn,
        {
          [s.request]: isShowLoading,
          [s.error]: status === 'Error',
          [s.success]: status === 'Success',
        },
        className
      )}
      disabled={isShowLoading || status === 'Success'}
      type={isSubmit ? 'submit' : 'button'}
      onClick={handleClick}
      style={{ width }}
    >
      <span className={cn(s.content, { [s.hiddenContent]: isShowLoading })}>{children}</span>
      <LoadingIcon className={cn(s.hiddenIcon, { [s.loadingIcon]: isShowLoading })} />
    </button>
  )
}

export default Button
