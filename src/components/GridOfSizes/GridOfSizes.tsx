import React, { useState } from 'react'
import cn from 'classnames'
import { IProduct } from '../../interfaces'
import s from './GridOfSizes.module.scss'

interface Props {
  product: IProduct
}

export default function GridOfSizes({ product }: Props) {
  const [activeBtn, setActiveBtn] = useState('')

  return (
    <div className={s.sizeWrapper}>
      {product.getAllSizeOptions().map(el => (
        <button
          type="button"
          onClick={() => setActiveBtn(el)}
          className={cn(s.baseBtn, {
            [s.activeBtn]: el === activeBtn,
            [s.disableBtn]: product.getAvailableSize()[el] === 0,
          })}
          key={el}
        >
          {el}
        </button>
      ))}
    </div>
  )
}
