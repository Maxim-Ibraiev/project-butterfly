import ProductPage from '../../src/pages/ProductPage'
import { wrapper } from '../../src/redux/store'
import { getCategoriesProps, getProductsProps } from '../../src/api/getStaticProps'
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
  const { data } = await api.getProducts()
  const productsStructure = getProductStructure(data)

  const paths = data
    ? productsStructure.map(product => ({
        params: { id: product.getId() },
      }))
    : [{ params: { id: '/' } }]

  return {
    paths,
    fallback: true,
  }
}
