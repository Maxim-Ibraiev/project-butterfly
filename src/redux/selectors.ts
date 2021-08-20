import type { Categories, IProduct, IState } from '../interfaces'

export const getState = (state: IState): IState => state
export const getCategories = (state: IState): Categories => state.main.categories
export const getProducts = (state: IState): IProduct[] => state.main.products
