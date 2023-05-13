import React, { useState } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import s from './InputFiles.module.scss'

interface IProps {
  fileName: string
  index: number
  onChange: (file: File, index: number) => void
  onDeleteItem?: (index: number) => void
  imageUrl?: string
  register?: UseFormRegister<FieldValues>
}

export default function InputFiles({
  fileName,
  index,
  onChange,
  onDeleteItem,
  imageUrl = null,
  register = null,
}: IProps) {
  const [selectedImages, setSelectedImages] = useState<string>(imageUrl)
  const [value, setValue] = useState('')
  const registerOptions = register ? register(fileName) : null

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files[0] || null

    if (file) {
      setSelectedImages(URL.createObjectURL(file))
    } else {
      setSelectedImages(imageUrl)
      setValue('')
    }

    onChange(file, index)
  }

  const handleDelete = () => {
    setSelectedImages(null)
    setValue('')
    onChange(null, index)

    if (onDeleteItem) onDeleteItem(index)
  }

  return (
    <div className={s.addContainer}>
      {selectedImages && (
        <div className={s.imageContainer}>
          <Image
            src={selectedImages}
            alt="Image to add"
            height={128}
            width={128}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
      <div className={s.border}>
        <input
          className={s.input}
          type="file"
          accept=".jpg,.png,.jpeg"
          value={value}
          name={fileName}
          {...registerOptions}
          onChange={handleChange}
        />
      </div>

      {selectedImages && (
        <button type="button" className={s.deleteButton} onClick={handleDelete}>
          {' '}
        </button>
      )}
    </div>
  )
}
