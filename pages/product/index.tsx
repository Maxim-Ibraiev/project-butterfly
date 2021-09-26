import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCategoriesProps, getProductsProps } from '../../src/api/staticProps'
import { REVALIDATE } from '../../src/constants'
import { dispatchData } from '../../src/helpers'
import { wrapper } from '../../src/redux/store'
import routes from '../../src/routes'

export default function Product() {
  const router = useRouter()

  useEffect(() => {
    router.push(routes.home)
  })
  return <section />
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
