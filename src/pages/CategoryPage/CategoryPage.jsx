import { useState } from 'react'
import Layout from '../../components/Layout'
import Filter from '../../components/filters/Filter'
import CardList from '../../components/CardList'
import s from './CategoryPage.module.scss'

export default function CategoryPage({ products }) {
  return (
    <Layout className={s.layout}>
      <Filter />
      <CardList products={products} />
    </Layout>
  )
}
