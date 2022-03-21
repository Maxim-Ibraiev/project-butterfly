import React, { useEffect, useRef, useState } from 'react'
import Checkout from '../../components/Checkout'
import Layout from '../../components/Layout'
import ToggleList from '../../components/ToggleList'
import ShoppingBagItem from '../../components/ShoppingBagItem'
import { useSelectedProducts } from '../../customHook'
import s from './checkoutPage.module.scss'
import language from '../../language'

export default function CheckoutPage() {
  const [selectedProducts] = useSelectedProducts()

  return (
    <Layout>
      <div className={s.wrapper}>
        <ToggleList title={language.productsInBag} classList={s.productList}>
          <ul>
            {selectedProducts.map(product => (
              <li key={product.getId()}>
                <ShoppingBagItem product={product} handleDelete={() => null} />
              </li>
            ))}
          </ul>
        </ToggleList>
        <Checkout />
      </div>
    </Layout>
  )
}
