import { wrapper } from '../../src/redux/store'
import CheckoutPage from '../../src/pages/CheckoutPage'
import { getCategoriesProps, getProductsProps, getShoppingProps } from '../../src/api/getStaticProps'
import * as actions from '../../src/redux/main/mainActions'
import { dispatchData } from '../../src/helpers'
import { getProductById } from '../../src/redux/selectors'

export default function Checkout() {
  return <CheckoutPage />
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  const categoriesResponse = await getCategoriesProps()
  const productsResponse = await getProductsProps()

  dispatchData(store.dispatch, categoriesResponse, productsResponse)
  const userId = typeof query.userId === 'string' ? query.userId : null
  const shoppingBagResponse = userId && (await getShoppingProps(userId))

  const isRequestSuccess = userId && shoppingBagResponse.data
  const selectedProducts =
    isRequestSuccess &&
    shoppingBagResponse.data.selectedProducts.map(el => getProductById(store.getState(), el.id))

  if (selectedProducts) store.dispatch(actions.setSelectedProducts(selectedProducts))

  return {
    props: {},
  }
})
