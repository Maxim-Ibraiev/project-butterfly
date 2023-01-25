import React from 'react'
import { useReduceSelectors } from '../../customHook'
import language from '../../language'
import CardList from '../CardList'
import Text from '../Text'

function CategoryRow() {
  const { products } = useReduceSelectors()
  const jeansProducts = products.filter(el => el.getCategory() === 'jeans').filter((_, ind) => ind <= 3)
  const largeProducts = products.filter(el => el.getCategory() === 'largeSizes').filter((_, ind) => ind <= 3)
  const shirtProducts = products.filter(el => el.getCategory() === 'shirts').filter((_, ind) => ind <= 3)

  return (
    <div>
      <Text component="h2" type="header">
        {language.jeans}
      </Text>
      <CardList products={jeansProducts} />

      <Text component="h2" type="header">
        {language.largeSizes}
      </Text>
      <CardList products={largeProducts} />

      <Text component="h2" type="header">
        {language.shirts}
      </Text>
      <CardList products={shirtProducts} />
    </div>
  )
}

export default CategoryRow
