import { createReducer, combineReducers } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import {
  categoriesSuccess,
  categoriesError,
  productsSuccess,
  productsError,
  setSelectedProducts,
} from './mainActions'
import { getCategories } from '../selectors'
import { Categories, IProductObject, IError, IState } from '../../interfaces'

const categories = createReducer<Categories>([], {
  [categoriesSuccess.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }) => [...getCategories(payload)],
})

const products = createReducer<IProductObject[]>([], {
  [productsSuccess.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }: { payload: IState }) => payload.main.products,
})

const selectedProducts = createReducer<IProductObject[]>([], {
  [setSelectedProducts.type]: (_, { payload }) => payload,
  [HYDRATE]: (_, { payload }: { payload: IState }) => payload.main.selectedProducts,
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
