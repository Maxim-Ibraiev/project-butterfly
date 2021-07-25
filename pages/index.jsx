import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductsProps, getCategoriesProps } from '../src/api/staticProps'
import MainPage from '../src/pages/MainPage'
import {
  categoriesError,
  categoriesSuccess,
  productsError,
  productsSuccess,
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
    if (errorProducts) dispatch(productsError(errorProducts))
  })

  return <MainPage categories={categories} />
}

export async function getStaticProps() {
  const categoriesProps = await getCategoriesProps()
  const productsProps = await getProductsProps()

  return {
    props: {
      ...categoriesProps,
      ...productsProps,
    },
    revalidate: 600,
  }
}
