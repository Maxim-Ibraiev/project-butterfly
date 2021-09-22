import { createAction } from '@reduxjs/toolkit'

import type { IState, IProduct } from '../../interfaces'

export const categoriesSuccess = createAction<string[]>('main/categoriesSuccess')
export const categoriesError = createAction('main/categoriesError')

export const productsSuccess = createAction<IProduct[]>('main/productsSuccess')
export const productsError = createAction('main/productsError')

export const setSelectedProducts = createAction<IProduct[]>('main/selectedProducts')

export const hydrate = createAction<IState>('main/hydrate')

export const count = createAction('main/count')
