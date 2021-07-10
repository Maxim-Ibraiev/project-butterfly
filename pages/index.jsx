import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MainPage from '../src/pages/MainPage'
import api from '../src/api'
import {
  categoriesSuccess,
  categoriesError,
  productsSuccess,
  productsError,
} from '../src/redux/main/mainActions'

export default function Home({
  categories,
  errorCategories,
  products,
  errorProducts,
}) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!errorCategories && categories) dispatch(categoriesSuccess(categories))
    if (errorCategories) dispatch(categoriesError(errorCategories))

    if (!errorProducts && products) dispatch(productsSuccess(products))
    if (errorProducts) dispatch(productsError(errorCategories))
  })

  return <MainPage />
}

export async function getStaticProps() {
  const dataCategories = await api.getCategories()
  const dataProducts = await api.getProducts()

  return {
    props: {
      categories: dataCategories.categories,
      errorCategories: dataCategories.error,
      products: dataProducts.products,
      errorProducts: dataProducts.error,
    },
    revalidate: 100000,
  }
}
