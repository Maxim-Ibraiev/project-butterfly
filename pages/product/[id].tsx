import ProductPage from '../../src/pages/ProductPage'
import { wrapper } from '../../src/redux/store'
import { getProductStructure } from '../../src/redux/selectors'
import { dispatchData } from '../../src/helpers'
import { REVALIDATE } from '../../src/constants'
import api from '../../src/api'

export default function Product() {
  return <ProductPage />
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
  const { data, error } = await api.getProducts()
  const isSuccess = !error && !!data
  const productsStructure = isSuccess && getProductStructure(data)
  const paths = isSuccess
    ? productsStructure.map(product => ({
        params: { id: product.getId() },
      }))
    : [{ params: { id: '/' } }]

  return {
    paths,
    fallback: true,
  }
}
