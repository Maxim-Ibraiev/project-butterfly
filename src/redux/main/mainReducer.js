import { createReducer, combineReducers } from '@reduxjs/toolkit'
import {
  categoriesRequest,
  categoriesSuccess,
  categoriesError,
  productsSuccess,
  productsError,
} from './mainActions'

const categories = createReducer([], {
  [categoriesSuccess]: (_, { payload }) => payload,
})

const products = createReducer([], {
  [productsSuccess]: (_, { payload }) => payload,
})

const categoryLoading = createReducer(false, {
  [categoriesRequest]: () => true,
  [categoriesRequest]: () => false,
  [categoriesSuccess]: () => false,
})

const error = createReducer(null, {
  [categoriesSuccess]: () => null,
  [productsSuccess]: () => null,
  [categoriesError]: (_, { payload }) => payload,
  [productsError]: (_, { payload }) => payload,
})

const count = createReducer(0, {
  'contacts/count': (state, { payload }) => state + payload,
})

export default combineReducers({
  categories,
  products,
  categoryLoading,
  error,
  count,
})
