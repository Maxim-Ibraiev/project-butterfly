import React, { useState } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import InputFiles from '../inputs/InputFiles'
import s from './FilesGrid.module.scss'

interface IProps {
  register: UseFormRegister<FieldValues>
  fileName: string
}

export default function FilesGrid({ register, fileName }: IProps) {
  return (
    <div className={s.grid}>
      <InputFiles register={register} fileName={`${fileName}_0`} />
      <InputFiles register={register} fileName={`${fileName}_1`} />
      <InputFiles register={register} fileName={`${fileName}_2`} />
      <InputFiles register={register} fileName={`${fileName}_3`} />
      <InputFiles register={register} fileName={`${fileName}_4`} />
      <InputFiles register={register} fileName={`${fileName}_5`} />
    </div>
  )
}
