import CategoryPage from '../src/pages/CategoryPage'
import { wrapper } from '../src/redux/store'
import { getProductsProps, getCategoriesProps } from '../src/api/getStaticProps'
import { dispatchData } from '../src/helpers'
import { REVALIDATE, CATEGORIES } from '../src/constants'
import api from '../src/api'

export default function Category() {
  return <CategoryPage />
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const data = {
    categories: await api.getCategories(),
    products: await api.getProducts(),
  }

  dispatchData(store.dispatch, data)

  return {
    props: {},
    revalidate: REVALIDATE,
  }
})

export async function getStaticPaths() {
  const { data, error } = await api.getCategories()

  const paths = !error
    ? data.map(category => ({
        params: { category },
      }))
    : CATEGORIES.map(category => ({
        params: { category },
      }))

  return {
    paths,
    fallback: true,
  }
}
