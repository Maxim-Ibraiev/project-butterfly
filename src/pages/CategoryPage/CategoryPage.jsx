import Layout from '../../components/Layout'
import Filter from '../../components/Filter'
import CardList from '../../components/CardList'
import s from './CategoryPage.module.scss'

export default function CategoryPage() {
  const arr = []
  arr.length = 30
  return (
    <Layout className={s.layout}>
      <Filter />
      <CardList data={arr.fill('0')} />
    </Layout>
  )
}
