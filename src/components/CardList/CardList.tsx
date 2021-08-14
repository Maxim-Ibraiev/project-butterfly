import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import throttle from 'lodash.throttle'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import { getImgSize, getFilteredProducts } from '../../helpers'
import s from './CardList.module.scss'

import { IProduct } from '../../interfaces'

interface IProps {
  products: IProduct[]
}

export default function CardList({ products }: IProps) {
  const productsFromStorage = useSelector(getProducts)
  const router = useRouter()
  const data = products || productsFromStorage
  const params = queryString.parseUrl(router.asPath).query

  const [imgSize, setImgSize] = useState({ width: 170, height: 220 })
  const [filteredProducts, setFilteredProducts] = useState(getFilteredProducts(data, params))

  useEffect(() => {
    const currentParams = queryString.parseUrl(router.asPath).query

    setFilteredProducts(getFilteredProducts(data, currentParams))
  }, [router.asPath])

  useEffect(() => {
    const handleResize = () => throttle(() => setImgSize(getImgSize()), 2000)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <section className={s.cards}>
      {filteredProducts.map(el => (
        <ProductCard
          key={el.id || el.title}
          width={imgSize.width}
          height={imgSize.height}
          src="/products/ex-1.jpg"
          price={el.price}
          title={el.title}
          alt={el.title}
          material={el.material}
          // description={el.description}
          palette={['rgb(255, 178, 208)', 'red', 'green', 'while']}
          sises={[35, 37, 38, 40]}
        />
      ))}
    </section>
  )
}
