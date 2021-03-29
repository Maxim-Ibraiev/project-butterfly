import { useMemo } from 'react';
import { applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createStore,
  // configureStore,
  // getDefaultMiddleware,
} from '@reduxjs/toolkit';
import main from './main/mainReducer';
import user from './user/userReducers';
// const reducer = combineReducers({ main, user });
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3004/';
const initialState = {
  main: {},
  user: {},
};

// const userPersistConfig = {
//   key: 'token',
//   storage,
//   // whitelist: ['token'],
// };

// const store = configureStore({
//   reducer: { main, user: persistReducer(userPersistConfig, userReducer) },
//   middleware: getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   devTools: process.env.NODE_ENV === 'development',
// });

// const persistor = persistStore(store);
// // eslint-disable-next-line import/no-anonymous-default-export
// export default { store, persistor };
let store;
const reducer = combineReducers({ main, user });
function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
  // return configureStore({
  //   reducer: { main, user: persistReducer(userPersistConfig, user) },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  //   devTools: process.env.NODE_ENV === 'development',
  // });
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
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
