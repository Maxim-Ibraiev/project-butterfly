import * as categoriesController from './src/routes/categories/categoriesController'
import * as productsController from './src/routes/products/productsController'
import { Categories, IProductObject, IResponse } from '../interfaces'

const api = {
  getCategories: async (): Promise<IResponse<Categories>> => categoriesController.getCategories(),
  getProducts: async (): Promise<IResponse<IProductObject[]>> => productsController.getProducts(),
}

export default api
