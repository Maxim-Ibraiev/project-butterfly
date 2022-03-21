import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import ToggleSvg from '../icons/ToggleSvg'
import s from './ToggleList.module.scss'

interface IProps {
  title: string
  classList?: string
  classHeader?: string
}

const ToggleList: React.FC<IProps> = ({ title, classList, classHeader, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentBox = useRef<HTMLDivElement>()
  const [contentHight, setContentHight] = useState(1000)

  useEffect(() => {
    if (contentBox.current.clientHeight && contentHight === 1000)
      setContentHight(contentBox.current.clientHeight)
  })

  return (
    <div className={s.wrapper}>
      <button
        type="button"
        className={cn(s.header, { [classHeader]: classHeader })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={cn(s.toggleIcon, { [s.rotate]: isOpen })}>
          <ToggleSvg />
        </div>
        <span className={s.title}>{title}</span>
      </button>
      <div
        className={cn(s.content, { [s.isOpen]: isOpen, [classList]: classList })}
        style={isOpen ? { maxHeight: `${contentHight}px` } : { maxHeight: 0 }}
        ref={contentBox}
      >
        {children}
      </div>
    </div>
  )
}
export default ToggleList
