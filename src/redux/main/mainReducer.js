import { createReducer, combineReducers } from '@reduxjs/toolkit'
import {
  categoriesRequest,
  categoriesSuccess,
  categoriesError,
} from './mainActions'

const categories = createReducer([], {
  [categoriesSuccess]: (_, { payload }) => payload,
})

const categoryLoading = createReducer(false, {
  [categoriesRequest]: () => true,
  [categoriesRequest]: () => false,
  [categoriesSuccess]: () => false,
})

const error = createReducer(null, {
  [categoriesError]: (_, { payload }) => payload,
})

const count = createReducer(0, {
  'contacts/count': (state, { payload }) => state + payload,
})

export default combineReducers({
  categories,
  categoryLoading,
  error,
  count,
})
