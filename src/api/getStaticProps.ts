import api from './api'
import { ICategoriesProps, IProductsProps } from '../interfaces'

export const getProductsProps = async (): Promise<IProductsProps> => {
  const dataProducts = await api.getProducts()

  if (!dataProducts.data)
    throw new Error(
      `getCategoriesProps products : ${JSON.stringify(dataProducts.data)}  message: ${
        dataProducts.error.message
      }`
    )

  return { products: dataProducts.data, productsError: dataProducts.error }
}

export const getCategoriesProps = async (): Promise<ICategoriesProps> => {
  const dataCategories = await api.getCategories()

  if (!dataCategories.data)
    throw new Error(
      `getCategoriesProps categories : ${JSON.stringify(dataCategories.data)} message: ${
        dataCategories.error.message
      }`
    )

  return {
    categories: dataCategories.data,
    categoriesError: dataCategories.error,
  }
}
