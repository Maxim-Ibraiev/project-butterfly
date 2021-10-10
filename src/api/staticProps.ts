import api from './api'

import { ICategoriesProps, IProductsProps } from '../interfaces'

export const getProductsProps = async (): Promise<IProductsProps> => {
  const dataProducts = await api.getProducts()

  return { products: dataProducts.products, productsError: dataProducts.error }
}

export const getCategoriesProps = async (): Promise<ICategoriesProps> => {
  const dataCategories = await api.getCategories()

  return {
    categories: dataCategories.categories,
    categoriesError: dataCategories.error,
  }
}
