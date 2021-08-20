/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware, Action } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './rootReducer'

import type { IState } from '../interfaces'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const initStoreWrapper = () =>
  createStore<IState, Action, unknown, unknown>(reducer, bindMiddleware([thunkMiddleware]))

export const wrapper = createWrapper(initStoreWrapper)
