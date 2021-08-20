import Layout from '../../components/Layout'
import Filter from '../../components/filters/Filter'
import CardList from '../../components/CardList'
import s from './CategoryPage.module.scss'

export default function CategoryPage() {
  return (
    <Layout className={s.layout}>
      <Filter />
      <CardList />
    </Layout>
  )
}
