import { createReducer, combineReducers } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import {
  categoriesSuccess,
  categoriesError,
  productsSuccess,
  productsError,
  setSelectedProducts,
  setSelectedSizeOfProduct,
} from './mainActions'
import { getCategories } from '../selectors'
import { Categories, IProductObject, IError, IState } from '../../interfaces'

const categories = createReducer<Categories>([], {
  [HYDRATE]: (_, { payload }) => [...getCategories(payload)],
  [categoriesSuccess.type]: (_, { payload }) => payload,
})

const products = createReducer<IProductObject[]>([], {
  [HYDRATE]: (_, { payload }: { payload: IState }) => payload.main.products,
  [productsSuccess.type]: (_, { payload }) => payload,
  [setSelectedSizeOfProduct.type]: (p, { payload }) =>
    p.map(prd => (prd.id === payload.id ? { ...prd, selectedSize: payload.selectedSize } : prd)),
})

const selectedProducts = createReducer<IProductObject[]>([], {
  [HYDRATE]: (_, { payload }: { payload: IState }) => payload.main.selectedProducts,
  [setSelectedProducts.type]: (_, { payload }) => payload,
  [setSelectedSizeOfProduct.type]: (p, { payload }) =>
    p.map(prd => (prd.id === payload.id ? { ...prd, selectedSize: payload.selectedSize } : prd)),
})

const error = createReducer<IError>(null, {
  [HYDRATE]: (_, { payload }) => (payload.main.error ? { ...payload.main.error } : payload.main.error),
  [categoriesSuccess.type]: () => null,
  [productsSuccess.type]: () => null,
  [categoriesError.type]: (_, { payload }) => payload,
  [productsError.type]: (_, { payload }) => payload,
})

export default combineReducers({
  categories,
  products,
  selectedProducts,
  error,
})
