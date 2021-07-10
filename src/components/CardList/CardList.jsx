import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../redux/selectors'
import s from './CardList.module.scss'

export default function CardList({ data }) {
  const products = useSelector(getProducts)

  return (
    <section className={s.cards}>
      {products.map(el => (
        <ProductCard
          key={el.id || el.title}
          layout="responsive"
          width="100%"
          height="auto"
          src={el.image || '/products/ex-1.jpg'}
          price={el.price}
          description={el.description}
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
      ))}
    </section>
  )
}
