import { createAction } from '@reduxjs/toolkit'

import type { IState, IProduct, IShotSelectedProducts } from '../../interfaces'

export const categoriesSuccess = createAction<string[], string>('main/categoriesSuccess')
export const categoriesError = createAction('main/categoriesError')

export const productsSuccess = createAction<IProduct[]>('main/productsSuccess')
export const productsError = createAction('main/productsError')
export const setSelectedProducts = createAction<IProduct[]>('main/selectedProducts')
export const setSelectedSizeOfProduct = createAction<IShotSelectedProducts>('main/setSelectedSizeOfProduct')

export const hydrate = createAction<IState>('main/hydrate')
