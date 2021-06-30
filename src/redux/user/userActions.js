import { createAction } from '@reduxjs/toolkit'

export const singUpRequest = createAction('user/singUpRequest')
export const singUpSuccess = createAction('user/singUpSuccess')
export const singUpError = createAction('user/singUpError')

export const loginRequest = createAction('user/loginRequest')
export const loginSuccess = createAction('user/loginSuccess')
export const loginError = createAction('user/loginError')

export const isAuthorizedRequest = createAction('user/isAuthorizedRequest')
export const isAuthorizedSuccess = createAction('user/isAuthorizedSuccess')
export const isAuthorizedError = createAction('user/isAuthorizedError')

export const logoutRequest = createAction('user/logoutRequest')
export const logoutSuccess = createAction('user/logoutSuccess')
export const logoutError = createAction('user/logoutError')

export const currentUserRequest = createAction('user/currentUserRequest')
export const currentUserSuccess = createAction('user/currentUserSuccess')
export const currentUserError = createAction('user/currentUserError')
