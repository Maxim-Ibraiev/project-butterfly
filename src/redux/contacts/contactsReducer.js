import { createReducer, combineReducers } from '@reduxjs/toolkit'
import {
  filter,
  addItemRequest,
  addItemSuccess,
  addItemError,
  deleteRequest,
  deleteSuccess,
  deleteError,
  itemsRequest,
  itemsSuccess,
  itemsError,
} from './contactsActions'

const filterReducer = createReducer('', {
  [filter]: (_, { payload }) => payload,
})

const itemsReducer = createReducer([], {
  [itemsSuccess]: (_, { payload }) => [...payload],
  [addItemSuccess]: (state, { payload }) => [payload, ...state],
  [deleteSuccess]: (state, { payload }) => [
    ...state.filter(contact => contact.id !== payload),
  ],
})

const loadingReducer = createReducer(false, {
  [itemsRequest]: () => true,
  [itemsSuccess]: () => false,
  [itemsError]: () => false,

  [addItemRequest]: () => true,
  [addItemSuccess]: () => false,
  [addItemError]: () => false,

  [deleteRequest]: () => true,
  [deleteSuccess]: () => false,
  [deleteError]: () => false,
})

const errorReducer = createReducer(null, {
  [itemsError]: (_, { payload }) => payload,
  [addItemError]: (_, { payload }) => payload,
  [deleteError]: (_, { payload }) => payload,
})

export default combineReducers({
  filter: filterReducer,
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
})
