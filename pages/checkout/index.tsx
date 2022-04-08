import { wrapper } from '../../src/redux/store'
import CheckoutPage from '../../src/pages/CheckoutPage'
import { dispatchData } from '../../src/helpers'
import api from '../../src/api'

export default function Checkout() {
  return <CheckoutPage />
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  const data = {
    categories: await api.getCategories(),
    products: await api.getProducts(),
    shoppingBag: query.shoppingId && (await api.getShoppingBag(query.shoppingId)),
  }

  dispatchData(store.dispatch, data)

  return {
    props: {},
  }
})
