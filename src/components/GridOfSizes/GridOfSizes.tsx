import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { IProduct } from '../../interfaces'
import { setSelectedSizeOfProduct } from '../../redux/main/mainActions'
import s from './GridOfSizes.module.scss'

interface Props {
  product: IProduct
}

export default function GridOfSizes({ product }: Props) {
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState(product.getSelectedSize())

  function handleClick(size: string) {
    if (size === selectedSize) {
      dispatch(setSelectedSizeOfProduct([{ id: product.getId(), selectedSize: '' }]))
      setSelectedSize('')
    } else {
      setSelectedSize(size)
      dispatch(setSelectedSizeOfProduct([{ id: product.getId(), selectedSize: size }]))
    }
  }

  useEffect(() => {
    setSelectedSize(product.getSelectedSize())
  }, [product])

  return (
    <div className={s.sizeWrapper}>
      {product.getAllSizeOptions().map(size => (
        <button
          type="button"
          onClick={() => handleClick(size)}
          className={cn(s.baseBtn, {
            [s.activeBtn]: size === selectedSize,
            [s.disableBtn]: product.getAvailableSize()[size] === 0,
          })}
          key={size}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
