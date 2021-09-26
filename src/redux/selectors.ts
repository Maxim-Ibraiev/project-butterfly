import type { Categories, IProduct, IState } from '../interfaces'

export const getState = (state: IState): IState => state
export const getCategories = (state: IState): Categories => state.main.categories
export const getProducts = (state: IState): IProduct[] => state.main.products
export const getSelectedProducts = (state: IState): IProduct[] => state.main.selectedProducts
export const getProductById = (state: IState, id: string): IProduct | undefined =>
  getProducts(state).find(el => el.id === id)
export const getProductsByModel = (state: IState, model: string): IProduct[] =>
  getProducts(state).filter(product => product.model === model)
