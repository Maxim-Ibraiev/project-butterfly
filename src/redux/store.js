/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reducer from './rootReducer'

const initialState = {
  main: {
    categories: [],
    categoryLoading: false,
    error: null,
    count: 0,
  },
  user: {
    email: '',
    name: '',
    token: '',
    isAuthorized: false,
    loading: false,
    error: null,
  },
}
// function initStore(preloadedState = initialState) {
//   return createStore(
//     persistedReducer,
//     preloadedState,
//     composeWithDevTools(
//       applyMiddleware(
//         ...getDefaultMiddleware({
//           serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//           },
//           devTools: process.env.NODE_ENV === 'development',
//         })
//       )
//     )
//   )
// }

const persistConfig = {
  key: 'store',
  storage,
  whitelist: ['main'],
}
const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const initializeStore = ({ isServer }) => {
  if (isServer) {
    // If it's on server side, create a store
    return createStore(
      (reducer = initialState),
      bindMiddleware([thunkMiddleware])
    )
  }
  // If it's on client side, create a store which will persist
  const persistedReducer = persistReducer(persistConfig, reducer) // Create a new reducer with our existing reducer
  const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware])) // Creating the store again

  store.__persistor = persistStore(store) // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

  return store
}

export const wrapper = createWrapper(initializeStore)
