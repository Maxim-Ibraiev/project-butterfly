import api from '../src/api/serverApi'
import { REVALIDATE, CATEGORIES } from '../src/constants'
import { dispatchData } from '../src/helpers'
import CategoryPage from '../src/pages/CategoryPage'
import { wrapper } from '../src/redux/store'

export default function Category() {
  return <CategoryPage />
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const data = {
    products: await api.getProducts(),
  }

  dispatchData(store.dispatch, data)

  return {
    props: {},
    revalidate: REVALIDATE,
  }
})

export async function getStaticPaths() {
  const paths = CATEGORIES.map(globalCategory => ({
    params: { globalCategory },
  }))

  return {
    paths,
    fallback: true,
  }
}
