import api from '../../src/api'
import { REVALIDATE } from '../../src/constants'
import { dispatchData } from '../../src/helpers'
import ProductPage from '../../src/pages/ProductPage'
import { getProductStructure } from '../../src/redux/selectors'
import { wrapper } from '../../src/redux/store'

export default function Product() {
  return <ProductPage />
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
  let paths = []

  try {
    const { data } = await api.getProducts()
    const productsStructure = getProductStructure(data)
    paths = productsStructure.map(product => ({
      params: { id: product.getId() },
    }))
  } catch (error) {
    console.error('Product fetch error: ', error)
  }

  return {
    paths,
    fallback: true,
  }
}
