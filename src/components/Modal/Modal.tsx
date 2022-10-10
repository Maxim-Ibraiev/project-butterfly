import React from 'react'
import cn from 'classnames'
import ReactModal, { Props } from 'react-modal'
import s from './Modal.module.scss'

interface IProps {
  modalClassName: string
}

export default function Modal({
  children,
  className,
  overlayClassName,
  modalClassName,
  isOpen,
  ...props
}: Props & IProps) {
  return (
    <ReactModal
      className={cn(s.center, modalClassName, className)}
      overlayClassName={cn(overlayClassName, s.layout)}
      isOpen={isOpen}
      {...props}
    >
      {children}
    </ReactModal>
  )
}
