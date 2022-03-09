/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames'
import React, { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import s from './Input.module.scss'

interface IProp {
  label: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  name?: string
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
}

export default function Input({
  label,
  register,
  required = false,
  name = label,
  type = 'text',
  autoComplete = 'on',
}: IProp) {
  const [firstRender, setFirstRender] = useState(true)

  const handleBlur = () => {
    if (firstRender) setFirstRender(false)
  }

  return (
    <div className={s.container}>
      <input
        className={s.input}
        {...register(name, { onBlur: handleBlur, required })}
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
      />
      <label
        htmlFor={label}
        className={cn(s.label, {
          [s.notFirstRender]: !firstRender,
        })}
      >
        {label}
      </label>
    </div>
  )
}
