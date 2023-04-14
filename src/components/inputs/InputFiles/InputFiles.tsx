import React, { useState } from 'react'
import Image from 'next/image'
import s from './InputFiles.module.scss'

interface IProps {
  fileName: string
  index: number
  onChange: (file: File, index: number) => void
  onDeleteItem?: (index: number) => void
  imageUrl?: string
}

export default function InputFiles({ fileName, index, onChange, onDeleteItem, imageUrl = null }: IProps) {
  const [selectedImages, setSelectedImages] = useState<string>(imageUrl)
  const [value, setValue] = useState<string>('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files[0] || null

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
          <Image src={selectedImages} alt="Image to add" height={128} width={128} objectFit="contain" />
        </div>
      )}
      <input
        name={fileName}
        value={value}
        className={s.input}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={handleChange}
      />
      {selectedImages && (
        <button type="button" className={s.deleteButton} onClick={handleDelete}>
          {' '}
        </button>
      )}
    </div>
  )
}
