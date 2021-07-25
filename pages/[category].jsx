import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CategoryPage from '../src/pages/CategoryPage'
import { getProductsProps, getCategoriesProps } from '../src/api/staticProps'
import {
  productsError,
  productsSuccess,
  categoriesError,
  categoriesSuccess,
} from '../src/redux/main/mainActions'

export default function Category({ products, errorProducts, errorCategories, categories }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!errorCategories && categories) dispatch(categoriesSuccess(categories))
    if (errorCategories) dispatch(categoriesError(errorCategories))

    if (!errorProducts && products) dispatch(productsSuccess(products))
    if (errorProducts) dispatch(productsError(errorProducts))
  })
  return <CategoryPage products={products} />
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

export async function getStaticPaths() {
  const { categories, errorCategories } = await getCategoriesProps()

  const paths = !errorCategories
    ? categories.map(category => ({
        params: { category },
      }))
    : [{ params: { category: 'dress' } }]

  return {
    paths,
    fallback: true,
  }
}
