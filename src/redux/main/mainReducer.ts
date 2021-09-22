import { createReducer, combineReducers } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import {
  categoriesSuccess,
  categoriesError,
  productsSuccess,
  productsError,
  setSelectedProducts,
} from './mainActions'

import type { Categories, IProduct, IError } from '../../interfaces'

const categories = createReducer<Categories>([], {
  [categoriesSuccess.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }) => [...payload.main.categories],
})

const products = createReducer<IProduct[]>([], {
  [productsSuccess.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }) => payload.main.products,
})

const selectedProducts = createReducer<IProduct[]>([], {
  [setSelectedProducts.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }) => payload.main.selectedProducts,
})

const error = createReducer<IError>(null, {
  [categoriesSuccess.type]: () => null,
  [productsSuccess.type]: () => null,
  [categoriesError.type]: (_, { payload }) => payload,
  [productsError.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }) => (payload.main.error ? { ...payload.main.error } : payload.main.error),
})

export default combineReducers({
  categories,
  products,
  selectedProducts,
  error,
})
