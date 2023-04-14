import React, { useState } from 'react'
import { IProductObject } from '../../interfaces'
import InputFiles from '../inputs/InputFiles'
import s from './FilesGrid.module.scss'

interface IProps {
  onDeleteItem?: (index: number) => void
  onChange: (files: File[]) => void
  images?: IProductObject['images']
}

export default function FilesGrid({ onChange, onDeleteItem, images = [] }: IProps) {
  const [fileList, setFileList] = useState(new Array(6).fill(null))

  const handleChange = (file: File, index: number) => {
    const copyValue = [...fileList]
    copyValue[index] = file

    setFileList(copyValue)
    onChange(copyValue)
  }

  return (
    <div className={s.grid}>
      <InputFiles
        onChange={handleChange}
        fileName="image-0"
        index={0}
        onDeleteItem={onDeleteItem}
        imageUrl={images[0]?.original}
      />
      <InputFiles
        onChange={handleChange}
        fileName="image-1"
        index={1}
        onDeleteItem={onDeleteItem}
        imageUrl={images[1]?.original}
      />
      <InputFiles
        onChange={handleChange}
        fileName="image-2"
        index={2}
        onDeleteItem={onDeleteItem}
        imageUrl={images[2]?.original}
      />
      <InputFiles
        onChange={handleChange}
        fileName="image-3"
        index={3}
        onDeleteItem={onDeleteItem}
        imageUrl={images[3]?.original}
      />
      <InputFiles
        onChange={handleChange}
        fileName="image-4"
        index={4}
        onDeleteItem={onDeleteItem}
        imageUrl={images[4]?.original}
      />
      <InputFiles
        onChange={handleChange}
        fileName="image-5"
        index={5}
        onDeleteItem={onDeleteItem}
        imageUrl={images[5]?.original}
      />
    </div>
  )
}
