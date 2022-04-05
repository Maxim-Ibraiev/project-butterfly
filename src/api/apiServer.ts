import * as categoriesController from './src/routes/categories/categoriesController'
import * as productsController from './src/routes/products/productsController'
import { getShoppingBag } from './src/routes/shoppingBag/shoppingBagController'
import { Categories, IProductObject, IResponse } from '../interfaces'

const apiServer = {
  getCategories: async (): Promise<IResponse<Categories>> => categoriesController.getCategories(),
  getProducts: async (): Promise<IResponse<IProductObject[]>> => productsController.getProducts(),
  getShoppingBag: async id => getShoppingBag({ query: { id } }),
}

export default apiServer
