import { useRouter } from 'next/router'
import CardList from '../../components/CardList'
import Filter from '../../components/filters/Filter'
import Layout from '../../components/Layout'
import NotFoundProduct from '../../components/NotFoundProduct'
import { CATEGORIES } from '../../constants'
import { useReduceSelectors } from '../../customHook'
import useFilter from '../../customHook/useFilter'

export default function CategoryPage() {
  const router = useRouter()
  const filter = useFilter()
  const { products } = useReduceSelectors()
  const filteredProducts = filter.getQueryProducts(products)
  const isValidCategory = CATEGORIES.includes(
    Array.isArray(router.query.globalCategory) ? router.query.globalCategory[0] : router.query.globalCategory
  )

  return (
    <Layout>
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
