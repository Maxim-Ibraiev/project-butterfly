import { ProductStructure } from '../helpers'
import { Categories, IError, IProduct, IProductObject, IState } from '../interfaces'

export const getState = (state: IState): IState => state
export const getCategories = (state: IState): Categories => state.main.categories
export const getProducts = (state: IState): IProduct[] => getProductStructure(state.main.products)
export const getProductsForRedux = (state: IState): IProductObject[] => state.main.products
export const getSelectedProductsForRedux = (state: IState): IProductObject[] => state.main.selectedProducts
export const getError = (state: IState): IError => state.main.error

export const getSelectedProducts = (state: IState): IProduct[] =>
  getProductStructure(state.main.selectedProducts)

export const getProductById = (state: IState, id: string): IProduct | undefined =>
  getProducts(state).find(el => el.getId() === id)

export const getProductsByModel = (state: IState, model: string): IProduct[] =>
  getProducts(state).filter(product => product.getModel() === model)

export const getProductStructure = (products: IProductObject[]): IProduct[] =>
  products.map(product => new ProductStructure(product))
