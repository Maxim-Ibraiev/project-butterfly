import api from './api'

import { ICategoriesProps, IProductsProps } from '../interfaces'

export const getProductsProps = async (): Promise<IProductsProps> => {
  const dataProducts = await api.getProducts()

  if (!dataProducts.products)
    throw new Error(`getCategoriesProps categories : ${JSON.stringify(dataProducts.products)}`)

  return { products: dataProducts.products, productsError: dataProducts.error }
}

export const getCategoriesProps = async (): Promise<ICategoriesProps> => {
  const dataCategories = await api.getCategories()

  if (!dataCategories.categories)
    throw new Error(`getCategoriesProps categories : ${JSON.stringify(dataCategories.categories)}`)

  return {
    categories: dataCategories.categories,
    categoriesError: dataCategories.error,
  }
}
