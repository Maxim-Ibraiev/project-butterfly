import api from '../../src/api'
import { dispatchData } from '../../src/helpers'
import CheckoutPage from '../../src/pages/CheckoutPage'
import { wrapper } from '../../src/redux/store'

export default function Checkout() {
  return <CheckoutPage />
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  const data = {
    products: await api.getProducts(),
    shoppingBag: query.shoppingId && (await api.getShoppingBag(query.shoppingId)),
  }

  dispatchData(store.dispatch, data)

  return {
    props: {},
  }
})
