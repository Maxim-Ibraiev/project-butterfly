import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import CustomSelector from '../CustomSelector'
import Button from '../buttons/MainButton'
import CloseSvg from '../icons/Close'
import { imageLoader } from '../../constants'
import { arrayWrapper, getOptionsFormatFromValue } from '../../helpers'
import language from '../../language'
import s from './ShoppingBagItem.module.scss'
import { IProduct, FilterOption } from '../../interfaces'

interface Props {
  product: IProduct
  handleClose: () => void
}

export default function ShoppingBagItem({ product, handleClose }: Props) {
  const [size, setSize] = useState<FilterOption[]>([])
  const options = getOptionsFormatFromValue(product.getAllSizeOptions())

  const handleChangeSize = useCallback(option => {
    setSize(arrayWrapper<FilterOption>(option))
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Image src={product.getMainImageSrc()} width={80} height={110} loader={imageLoader} />
      </div>
      <div className={s.info}>
        <span>{product.getTitle()}</span>
        <div className={s.size}>
          <span>{language.size}:</span>
          <div className={s.select}>
            <CustomSelector
              handleChange={handleChangeSize}
              options={options}
              type="size"
              value={size.map(el => el.value)}
            />
          </div>
        </div>
      </div>
      <Button className={s.close} handleClick={handleClose}>
        <CloseSvg />
      </Button>
    </div>
  )
}
