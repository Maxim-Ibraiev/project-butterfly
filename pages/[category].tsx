import { useEffect } from 'react'
import CategoryPage from '../src/pages/CategoryPage'
import { getProductsProps, getCategoriesProps } from '../src/api/staticProps'
import { useDispatchData } from '../src/customHook'
import { REVALIDATE } from '../src/constants'

import { IProductsProps, ICategoriesProps } from '../src/interfaces'

interface IProps {
  categoriesResponse: ICategoriesProps
  productsResponse: IProductsProps
}

export default function Category({ categoriesResponse, productsResponse }: IProps) {
  useDispatchData(categoriesResponse, productsResponse)

  return <CategoryPage products={productsResponse?.products} categories={categoriesResponse?.categories} />
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

export async function getStaticPaths() {
  const { categories, categoriesError } = await getCategoriesProps()

  const paths = !categoriesError
    ? categories.map(category => ({
        params: { category },
      }))
    : [{ params: { category: 'dress' } }]

  return {
    paths,
    fallback: true,
  }
}
