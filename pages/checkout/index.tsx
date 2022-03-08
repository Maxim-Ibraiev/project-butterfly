import { wrapper } from '../../src/redux/store'
import CheckoutPage from '../../src/pages/CheckoutPage'
import { getCategoriesProps, getProductsProps } from '../../src/api/getStaticProps'
import { dispatchData } from '../../src/helpers'
import { REVALIDATE } from '../../src/constants'

export default function Home() {
  return <CheckoutPage />
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
