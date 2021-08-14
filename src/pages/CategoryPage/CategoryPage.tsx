import Layout from '../../components/Layout'
import Filter from '../../components/filters/Filter'
import CardList from '../../components/CardList'
import { Categories, IProduct } from '../../interfaces'
import s from './CategoryPage.module.scss'

interface Props {
  categories: Categories
  products?: IProduct
}
export default function CategoryPage({ products, categories }) {
  return (
    <Layout className={s.layout} categories={categories}>
      <Filter />
      <CardList products={products} />
    </Layout>
  )
}
