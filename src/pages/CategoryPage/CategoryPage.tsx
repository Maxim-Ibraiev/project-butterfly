import { useRouter } from 'next/router'
import CardList from '../../components/CardList'
import Filter from '../../components/filters/Filter'
import Layout from '../../components/Layout'
import NotFoundProduct from '../../components/NotFoundProduct'
import { useReduceSelectors } from '../../customHook'
import useFilter from '../../customHook/useFilter'

export default function CategoryPage() {
  const router = useRouter()
  const filter = useFilter()
  const { products, categories } = useReduceSelectors()
  const filteredProducts = filter.getQueryProducts(products)
  const isValidCategory = categories.includes(
    Array.isArray(router.query.category) ? router.query.category[0] : router.query.category
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
