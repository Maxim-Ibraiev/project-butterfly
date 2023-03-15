import api from '../../src/api/serverApi'
import { REVALIDATE } from '../../src/constants'
import { dispatchData } from '../../src/helpers'
import ProductPage from '../../src/pages/ProductPage'
import { getProductStructure } from '../../src/redux/selectors'
import { wrapper } from '../../src/redux/store'

export default function Product() {
  return <ProductPage />
}

const productsResponse = api.getProducts()

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const data = {
    products: await productsResponse,
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
    const res = await productsResponse

    const productsStructure = getProductStructure(res.data)
    paths = productsStructure.map(product => ({
      params: { id: product.getId() },
    }))
  } catch (error) {
    console.error('Product fetch error in product/[id]: ', error)
  }

  return {
    paths,
    fallback: true,
  }
}
