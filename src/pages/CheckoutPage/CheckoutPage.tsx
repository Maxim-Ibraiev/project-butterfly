import React from 'react'
import Checkout from '../../components/Checkout'
import Layout from '../../components/Layout'
import ToggleList from '../../components/ToggleList'
import ShoppingBagItem from '../../components/ShoppingBagItem'
import { useSelectedProducts } from '../../customHook'
import s from './checkoutPage.module.scss'
import language from '../../language'

export default function CheckoutPage() {
  const [selectedProducts] = useSelectedProducts()
  const hightOfItem = 154

  return (
    <Layout>
      <div className={s.wrapper}>
        <ToggleList
          title={language.productsInBag}
          classList={s.productList}
          contentHight={hightOfItem * selectedProducts.length}
        >
          {selectedProducts.map(product => (
            <ShoppingBagItem product={product} handleDelete={() => null} key={product.getId()} />
          ))}
        </ToggleList>
        <Checkout />
      </div>
    </Layout>
  )
}
