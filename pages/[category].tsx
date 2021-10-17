import CategoryPage from '../src/pages/CategoryPage'
import { wrapper } from '../src/redux/store'
import { getProductsProps, getCategoriesProps } from '../src/api/getStaticProps'
import { dispatchData } from '../src/helpers'
import { REVALIDATE, CATEGORIES } from '../src/constants'

export default function Category() {
  return <CategoryPage />
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const categoriesResponse = await getCategoriesProps()
  const productsResponse = await getProductsProps()

  dispatchData(store.dispatch, categoriesResponse, productsResponse)

  return {
    props: {},
    revalidate: REVALIDATE,
  }
})

export async function getStaticPaths() {
  const { categories, categoriesError } = await getCategoriesProps()

  const paths = !categoriesError
    ? categories.map(category => ({
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
