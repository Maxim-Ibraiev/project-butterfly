import { wrapper } from '../src/redux/store'
import MainPage from '../src/pages/MainPage'
import { dispatchData } from '../src/helpers'
import { REVALIDATE } from '../src/constants'
import api from '../src/api'

export default function Home() {
  return <MainPage />
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
