import { getCategoriesProps, getProductsProps } from '../../src/api/staticProps'
import { REVALIDATE } from '../../src/constants'
import { dispatchData } from '../../src/helpers'
import ProductPage from '../../src/pages/ProductPage'
import { wrapper } from '../../src/redux/store'

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
  console.log(products)
  if (!products) throw new Error(`products : ${JSON.stringify(products)}`)

  const paths = products
    ? products.map(product => ({
        params: { id: product.id },
      }))
    : [{ params: { id: '/' } }]

  return {
    paths,
    fallback: true,
  }
}
