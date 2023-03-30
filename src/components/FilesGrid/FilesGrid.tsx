import React from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { IProductObject } from '../../interfaces'
import InputFiles from '../inputs/InputFiles'
import s from './FilesGrid.module.scss'

interface IProps {
  register: UseFormRegister<FieldValues>
  fileName: string
  images: IProductObject['images']
}

export default function FilesGrid({ register, fileName, images }: IProps) {
  return (
    <div className={s.grid}>
      <InputFiles register={register} fileName={`${fileName}_0`} imageUrl={images[0]?.original} />
      <InputFiles register={register} fileName={`${fileName}_1`} imageUrl={images[1]?.original} />
      <InputFiles register={register} fileName={`${fileName}_2`} imageUrl={images[2]?.original} />
      <InputFiles register={register} fileName={`${fileName}_3`} imageUrl={images[3]?.original} />
      <InputFiles register={register} fileName={`${fileName}_4`} imageUrl={images[4]?.original} />
      <InputFiles register={register} fileName={`${fileName}_5`} imageUrl={images[5]?.original} />
    </div>
  )
}
