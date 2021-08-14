import { getProductsProps, getCategoriesProps } from '../src/api/staticProps'
import MainPage from '../src/pages/MainPage'
import { useDispatchData } from '../src/customHook'
import { REVALIDATE } from '../src/constants'

export default function Home({ categoriesResponse, productsResponse }) {
  useDispatchData(categoriesResponse)

  return <MainPage categories={categoriesResponse.categories} />
}

export async function getStaticProps() {
  const categoriesResponse = await getCategoriesProps()
  const productsResponse = await getProductsProps()

  return {
    props: {
      categoriesResponse,
      productsResponse,
    },
    revalidate: REVALIDATE,
  }
}
