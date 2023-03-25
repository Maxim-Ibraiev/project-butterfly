import React, { useState } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import s from './InputFiles.module.scss'

interface IProps {
  register: UseFormRegister<FieldValues>
  fileName: string
}

export default function InputFiles({ register, fileName }: IProps) {
  const [selectedImages, setSelectedImages] = useState<string>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files[0]

    if (file) {
      setSelectedImages(URL.createObjectURL(file))
    } else {
      setSelectedImages(null)
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

/* return (
    <div>
      <div className={s.grid}>
        <div className={s.addContainer}>
          <input
            {...register(fileName)}
            className={s.input}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={handleChange}
          />
        </div>
        {selectedImages ? (
          selectedImages.map(el => (
            <div key={el} className={s.imageContainer}>
              <Image src={el} alt="Image to add" height={128} width={128} objectFit="contain" />
            </div>
          ))
        ) : (
          <>
            <div className={s.imageContainer} />
            <div className={s.imageContainer} />
            <div className={s.imageContainer} />
          </>
        )}
      </div>
      <div>{selectedImages}</div>
    </div>
  )
}

*/
