import { createAction } from '@reduxjs/toolkit'

export const categoriesRequest = createAction('contacts/categoriesRequest')
export const categoriesSuccess = createAction('contacts/categoriesSuccess')
export const categoriesError = createAction('contacts/categoriesError')

export const productsRequest = createAction('contacts/productsRequest')
export const productsSuccess = createAction('contacts/productsSuccess')
export const productsError = createAction('contacts/productsError')

export const count = createAction('contacts/count')
