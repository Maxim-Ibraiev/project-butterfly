import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginError,
  singUpRequest,
  singUpSuccess,
  singUpError,
  isAuthorizedRequest,
  isAuthorizedSuccess,
  isAuthorizedError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  currentUserRequest,
  currentUserSuccess,
  currentUserError,
} from './userActions';

const token = createReducer('', {
  [loginSuccess]: (_, { payload }) => payload.token,
  [singUpSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => '',

  [currentUserError]: () => '',
});

const name = createReducer('', {
  [singUpSuccess]: (_, { payload }) => payload.user.name,
  [loginSuccess]: (_, { payload }) => payload.user.name,
  [logoutSuccess]: () => '',
  [currentUserSuccess]: (_, { payload }) => payload.name,
});

const email = createReducer('', {
  [singUpSuccess]: (_, { payload }) => payload.user.email,
  [loginSuccess]: (_, { payload }) => payload.user.email,
  [logoutSuccess]: () => '',
  [currentUserSuccess]: (_, { payload }) => payload.email,
});

const isAuthorized = createReducer(false, {
  [isAuthorizedSuccess]: () => true,
  [currentUserSuccess]: () => true,
  [currentUserError]: () => false,
  [loginSuccess]: () => true,
  [singUpSuccess]: () => true,
  [logoutSuccess]: () => false,
});

const loading = createReducer(false, {
  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,

  [singUpRequest]: () => true,
  [singUpSuccess]: () => false,
  [singUpError]: () => false,

  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,

  [currentUserRequest]: () => true,
  [currentUserSuccess]: () => false,
  [currentUserError]: () => false,

  [isAuthorizedRequest]: () => true,
  [isAuthorizedSuccess]: () => false,
  [isAuthorizedError]: () => false,
});

const error = createReducer(null, {
  [singUpError]: (state, { payload }) => payload,
  [loginError]: (state, { payload }) => payload,
  [logoutError]: (state, { payload }) => payload,
  [isAuthorizedError]: (state, { payload }) => payload,
  [currentUserError]: (state, { payload }) => payload,
});

export default combineReducers({
  email,
  name,
  token,
  isAuthorized,
  loading,
  error,
});
