import { createAction } from '@reduxjs/toolkit'
import type { IState, IProduct, IShotSelectedProducts, IProductObject, IError } from '../../interfaces'

export const productsSuccess = createAction<IProductObject[]>('main/productsSuccess')
export const productsError = createAction<IError>('main/productsError')

export const selectedProductsSuccess = createAction<IProduct[]>('main/selectedProductsSuccess')
export const selectedProductsError = createAction<IError>('main/selectedProductsError')

export const setSelectedProducts = createAction<IProduct[]>('main/selectedProducts')
export const setSelectedSizeOfProduct = createAction<IShotSelectedProducts>('main/setSelectedSizeOfProduct')

export const hydrate = createAction<IState>('main/hydrate')
