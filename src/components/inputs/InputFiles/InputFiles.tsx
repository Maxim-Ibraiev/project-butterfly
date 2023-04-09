import React, { useState } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import s from './InputFiles.module.scss'

interface IProps {
  register: UseFormRegister<FieldValues>
  fileName: string
  imageUrl?: string
}

export default function InputFiles({ register, fileName, imageUrl = null }: IProps) {
  const [selectedImages, setSelectedImages] = useState<string>(imageUrl)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files[0]

    if (file) {
      setSelectedImages(URL.createObjectURL(file))
    } else {
      setSelectedImages(imageUrl)
    }
  }

  return (
    <div className={s.addContainer}>
      {selectedImages && (
        <div className={s.imageContainer}>
          <Image src={selectedImages} alt="Image to add" height={128} width={128} objectFit="contain" />
        </div>
      )}
      <input
        {...register(fileName)}
        className={s.input}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={handleChange}
      />
    </div>
  )
}
