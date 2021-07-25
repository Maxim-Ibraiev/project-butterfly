import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import { getImgSize, getFilteredProducts } from '../../helpers'

import s from './CardList.module.scss'

export default function CardList({ products, filter }) {
  const productsFromStorage = useSelector(getProducts)
  const [size, setSize] = useState({ width: 170, height: 220 })
  const [firstRender, setFirstRender] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const data = products || productsFromStorage

  useEffect(() => {
    if ((productsFromStorage, filter)) {
      setFilteredProducts(getFilteredProducts(productsFromStorage, filter))
    }

    if (firstRender) {
      setFilteredProducts(productsFromStorage)
      setSize(getImgSize())
      setFirstRender(false)
    }

    const handleResize = throttle(() => setSize(getImgSize()), 2000)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [firstRender, productsFromStorage, filter])

  const colors = () => [
    Math.random() > 0.5 ? 'blue' : 'black',
    'rgb(255, 178, 208)',
    'red',
    'green',
    'while',
  ]
  return (
    <section className={s.cards}>
      {data.map(el => (
        <ProductCard
          key={el.id || el.title}
          width={size.width}
          height={size.height}
          src="/products/ex-1.jpg"
          price={el.price}
          title={el.title}
          material={el.material}
          description={el.description}
          palette={['rgb(255, 178, 208)', 'red', 'green', 'while']}
          sises={[35, 37, 38, 40]}
        />
      ))}
    </section>
  )
}
