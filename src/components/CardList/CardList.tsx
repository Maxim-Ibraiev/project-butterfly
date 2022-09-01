import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import { getImgSize } from '../../helpers'
import ProductCard from '../cards/ProductCard'

import s from './CardList.module.scss'
import { IProduct } from '../../interfaces'

interface IProps {
  products: IProduct[]
}

export default function CardList({ products }: IProps) {
  const [imgSize, setImgSize] = useState({ width: 170, height: 220 })

  useEffect(() => {
    const handleResize = throttle(() => setImgSize(getImgSize()), 1000)

    window.addEventListener('resize', handleResize)
    setImgSize(getImgSize())

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className={s.cards}>
      {products.map(el => (
        <ProductCard key={el.getId()} width={imgSize.width} height={imgSize.height} product={el} />
      ))}
    </section>
  )
}
