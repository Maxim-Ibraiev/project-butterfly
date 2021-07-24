import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CategoryPage from '../src/pages/CategoryPage'
import { getProductsProps, getCategoriesProps } from '../src/api/staticProps'
import { productsError, productsSuccess } from '../src/redux/main/mainActions'

export default function Category({ products, errorProducts }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!errorProducts && products) dispatch(productsSuccess(products))
    if (errorProducts) dispatch(productsError(errorProducts))
  })
  return <CategoryPage />
}

export async function getStaticProps() {
  const categoriesProps = await getCategoriesProps()
  const productsProps = await getProductsProps()

  return {
    props: {
      ...categoriesProps,
      ...productsProps,
    },
    revalidate: 100000,
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { category: 'suit' } }],
    fallback: true,
  }
}
