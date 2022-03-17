import cn from 'classnames'
import React, { useState } from 'react'
import ToggleSvg from '../icons/ToggleSvg'
import s from './ToggleList.module.scss'

interface IProps {
  title: string
  contentHight?: number
  classList?: string
  classHeader?: string
}

const ToggleList: React.FC<IProps> = ({ title, contentHight = 1000, classList, classHeader, children }) => {
  const [isOpen, setIsOpen] = useState(false)

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
        style={{ maxHeight: isOpen ? `${contentHight}px` : 0 }}
      >
        {children}
      </div>
    </div>
  )
}
export default ToggleList
