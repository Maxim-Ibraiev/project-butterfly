import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import { getImgSize, getFilteredProducts } from '../../helpers'

import s from './CardList.module.scss'

export default function CardList({ filter }) {
  const data = useSelector(getProducts)
  const [size, setSize] = useState({ width: 170, height: 220 })
  const [firstRender, setFirstRender] = useState(true)
  const [products, setProducts] = useState(data)

  useEffect(() => {
    if ((data, filter)) {
      setProducts(getFilteredProducts(data, filter))
    }

    if (firstRender) {
      setProducts(data)
      setSize(getImgSize())
      setFirstRender(false)
    }

    const handleResize = throttle(() => setSize(getImgSize()), 2000)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [firstRender, data, filter])

  const colors = () => [
    Math.random() > 0.5 ? 'blue' : 'black',
    'rgb(255, 178, 208)',
    'red',
    'green',
    'while',
  ]
  return (
    <section className={s.cards}>
      {products.map(el => (
        <ProductCard
          key={el.id || el.title}
          width={size.width}
          height={size.height}
          src="/products/ex-1.jpg"
          price={el.price}
          title={el.title}
          material={el.material}
          description={el.description}
          palette={colors()}
          sises={[35, 37, 38, 40]}
        />
      ))}
    </section>
  )
}
