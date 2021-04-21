import { useMemo } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createStore,
  applyMiddleware,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import axios from 'axios';
import reducer from './rootReducer';

axios.defaults.baseURL = '/api';
const initialState = {};
const persistConfig = {
  key: 'store',
  storage,
  whitelist: ['main'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
let store;

function initStore(preloadedState = initialState) {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
          devTools: process.env.NODE_ENV === 'development',
        }),
      ),
    ),
  );
}
export const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined')
    return { _store, persistor: persistStore(_store) };
  // Create the store once in the client
  if (!store) store = _store;
  let persistor = persistStore(store);

  return { _store, persistor };
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
