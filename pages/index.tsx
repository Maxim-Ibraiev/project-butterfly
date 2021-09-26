import { wrapper } from '../src/redux/store'
import MainPage from '../src/pages/MainPage'
import { getCategoriesProps, getProductsProps } from '../src/api/staticProps'
import { dispatchData } from '../src/helpers'
import { REVALIDATE } from '../src/constants'

export default function Home() {
  return <MainPage />
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
