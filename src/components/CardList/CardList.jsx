import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import throttle from 'lodash.throttle'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import s from './CardList.module.scss'

const getImgSize = () => {
  const bodyWidth = document.body.clientWidth
  const numberOfColumns = () => {
    if (bodyWidth >= 1000) return 4
    if (bodyWidth >= 768) return 3

    return 2
  }
  const imgWidth = (bodyWidth - 37) / numberOfColumns()
  const imgHeight = imgWidth / 0.75

  return { width: imgWidth, height: imgHeight }
}

export default function CardList() {
  const products = useSelector(getProducts)
  const [size, setSize] = useState(getImgSize())

  useEffect(() => {
    const handleResize = throttle(() => setSize(getImgSize()), 2000)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

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
