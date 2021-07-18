import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import throttle from 'lodash.throttle'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import { getImgSize } from '../../helpers'
import s from './CardList.module.scss'

export default function CardList() {
  const products = useSelector(getProducts)
  const [size, setSize] = useState()
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if (firstRender) {
      setSize(getImgSize())
      setFirstRender(false)
    }

    const handleResize = throttle(() => setSize(getImgSize()), 2000)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [firstRender])

  return (
    <section className={s.cards}>
      {products.map(el => (
        <ProductCard
          key={el.id || el.title}
          width={size.width}
          height={size.height}
          src={el.image || '/products/ex-1.jpg'}
          price={el.price}
          title={el.title}
          description={el.description}
          palette={['rgb(255, 178, 208)', 'red', 'green', 'while']}
          sises={[35, 37, 38, 40]}
        />
      ))}
    </section>
  )
}
