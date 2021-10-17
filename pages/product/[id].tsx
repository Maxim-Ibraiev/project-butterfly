import ProductPage from '../../src/pages/ProductPage'
import { wrapper } from '../../src/redux/store'
import { getCategoriesProps, getProductsProps } from '../../src/api/getStaticProps'
import { getProductStructure } from '../../src/redux/selectors'
import { dispatchData } from '../../src/helpers'
import { REVALIDATE } from '../../src/constants'

export default function Product() {
  return <ProductPage />
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
  const { products } = await getProductsProps()

  const productsStructure = getProductStructure(products)

  const paths = products
    ? productsStructure.map(product => ({
        params: { id: product.getId() },
      }))
    : [{ params: { id: '/' } }]

  return {
    paths,
    fallback: true,
  }
}
