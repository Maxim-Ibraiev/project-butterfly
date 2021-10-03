import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import { getImgSize, getFilteredProducts } from '../../helpers'
import s from './CardList.module.scss'

export default function CardList() {
  const products = useSelector(getProducts)
  const router = useRouter()
  const [imgSize, setImgSize] = useState({ width: 170, height: 220 })
  const [filteredProducts, setFilteredProducts] = useState(getFilteredProducts(products, router.query))

  useEffect(() => {
    setFilteredProducts(getFilteredProducts(products, router.query))
  }, [router.query])

  useEffect(() => {
    const handleResize = throttle(() => setImgSize(getImgSize()), 1000)

    window.addEventListener('resize', handleResize)
    setImgSize(getImgSize())

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className={s.cards}>
      {filteredProducts.map(el => (
        <ProductCard key={el.getId()} width={imgSize.width} height={imgSize.height} product={el} />
      ))}
    </section>
  )
}
