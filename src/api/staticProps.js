import api from './api'

export const getProductsProps = async () => {
  const dataProducts = await api.getProducts()

  return { products: dataProducts.products, errorProducts: dataProducts.error }
}

export const getCategoriesProps = async () => {
  const dataCategories = await api.getCategories()

  return {
    categories: dataCategories.categories,
    errorCategories: dataCategories.error,
  }
}
