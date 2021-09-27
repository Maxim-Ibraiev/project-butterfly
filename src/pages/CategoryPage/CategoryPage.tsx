import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Filter from '../../components/filters/Filter'
import CardList from '../../components/CardList'
import s from './CategoryPage.module.scss'
import { getCategories } from '../../redux/selectors'
import NotFoundProduct from '../../components/NotFoundProduct'

export default function CategoryPage() {
  const router = useRouter()
  const categories = useSelector(getCategories)
  const isValidCategory = categories.includes(
    Array.isArray(router.query.category) ? router.query.category[0] : router.query.category
  )

  return (
    <Layout className={s.layout}>
      {isValidCategory ? (
        <>
          <Filter />
          <CardList />
        </>
      ) : (
        <NotFoundProduct />
      )}
    </Layout>
  )
}
