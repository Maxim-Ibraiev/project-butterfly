import React from 'react'
import Checkout from '../../components/Checkout'
import Layout from '../../components/Layout'
import ShoppingBag from '../../components/ShoppingBag'
import s from './CheckoutPage.module.scss'

export default function CheckoutPage() {
  return (
    <Layout>
      <div className={s.wrapper}>
        <Checkout />
        <ShoppingBag />
      </div>
    </Layout>
  )
}
