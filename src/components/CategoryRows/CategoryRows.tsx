import React from 'react'
import { useReduceSelectors } from '../../customHook'
import language from '../../language'
import CardList from '../CardList'
import Title from '../Title'
import s from './CategoryRow.module.scss'

function CategoryRow() {
  const { products } = useReduceSelectors()
  const jeansProducts = products.filter(el => el.getCategory() === 'jeans').filter((_, ind) => ind <= 3)
  const largeProducts = products.filter(el => el.getCategory() === 'largeSizes').filter((_, ind) => ind <= 3)
  const shirtProducts = products.filter(el => el.getCategory() === 'shirts').filter((_, ind) => ind <= 3)

  return (
    <div className={s.container}>
      <Title>{language.jeans}</Title>
      <CardList products={jeansProducts} />

      <Title>{language.largeSizes}</Title>
      <CardList products={largeProducts} />

      <Title>{language.shirts}</Title>
      <CardList products={shirtProducts} />
    </div>
  )
}

export default CategoryRow
