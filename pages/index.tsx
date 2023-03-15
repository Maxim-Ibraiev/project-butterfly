import api from '../src/api/serverApi'
import { REVALIDATE } from '../src/constants'
import { dispatchData } from '../src/helpers'
import MainPage from '../src/pages/MainPage'
import { wrapper } from '../src/redux/store'

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
