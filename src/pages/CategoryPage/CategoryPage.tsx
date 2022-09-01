import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import CardList from '../../components/CardList'
import Filter from '../../components/filters/Filter'
import Layout from '../../components/Layout'
import NotFoundProduct from '../../components/NotFoundProduct'
import useFilter from '../../customHook/useFilter'
import { getCategories, getProducts } from '../../redux/selectors'

import s from './CategoryPage.module.scss'

export default function CategoryPage() {
  const router = useRouter()
  const filter = useFilter()
  const products = useSelector(getProducts)
  const filteredProducts = filter.getQueryProducts(products)
  const categories = useSelector(getCategories)
  const isValidCategory = categories.includes(
    Array.isArray(router.query.category) ? router.query.category[0] : router.query.category
  )

  return (
    <Layout className={s.layout}>
      {isValidCategory ? (
        <>
          <Filter />
          <CardList products={filteredProducts} />
        </>
      ) : (
        <NotFoundProduct />
      )}
    </Layout>
  )
}
