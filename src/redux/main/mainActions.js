import { createAction } from '@reduxjs/toolkit'

export const categoriesRequest = createAction('contacts/categoriesRequest')
export const categoriesSuccess = createAction('contacts/categoriesSuccess')
export const categoriesError = createAction('contacts/categoriesError')

export const count = createAction('contacts/count')
