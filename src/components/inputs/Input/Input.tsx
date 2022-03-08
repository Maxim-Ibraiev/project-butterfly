import cn from 'classnames'
import React, { useState } from 'react'
import s from './Input.module.scss'

interface IProp {
  label: string
  value?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>

  name?: string
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
}

export default function Input({
  label,
  onChange,
  value = '',
  name = label,
  autoComplete = 'on',
  type = 'text',
}: IProp) {
  const [blockAnimation, setBlockAnimation] = useState(true)
  const [focusOut, setFocusOut] = useState(true)

  return (
    <div className={s.container}>
      <input
        className={s.input}
        onFocus={() => setBlockAnimation(false)}
        onBlur={() => setFocusOut(false)}
        id={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder=" "
        // ref={ref}
        // {...props}/
      />
      <label
        htmlFor={label}
        className={cn(s.label, {
          [s.block]: blockAnimation,
          [s.focusOut]: focusOut,
        })}
      >
        {label}
      </label>
    </div>
  )
}
