import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import { getImgSize } from '../../helpers'
import { IProduct } from '../../interfaces'
import ProductCard from '../cards/ProductCard'
import NoProduct from '../NoProduct'
import s from './CardList.module.scss'

interface IProps {
  products: IProduct[]
  getLinkForProdutc?: (id: string) => string
}

export default function CardList({ products, getLinkForProdutc }: IProps) {
  const [imgSize, setImgSize] = useState({ width: 170, height: 220 })

  useEffect(() => {
    const handleResize = throttle(() => setImgSize(getImgSize()), 1000)

    window.addEventListener('resize', handleResize)
    setImgSize(getImgSize())

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return products.length > 0 ? (
    <section className={s.cards}>
      {products.map(el => (
        <ProductCard
          key={el.getId()}
          width={imgSize.width}
          height={imgSize.height}
          product={el}
          getLinkForProdutc={getLinkForProdutc}
        />
      ))}
    </section>
  ) : (
    <NoProduct />
  )
}
