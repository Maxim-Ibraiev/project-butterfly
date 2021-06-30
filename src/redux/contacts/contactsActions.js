import { createAction } from '@reduxjs/toolkit'

export const filter = createAction('contacts/filter')

export const itemsRequest = createAction('contacts/itemsRequest')
export const itemsSuccess = createAction('contacts/itemsSuccess')
export const itemsError = createAction('contacts/itemsError')

export const addItemRequest = createAction('contacts/addItemRequest')
export const addItemSuccess = createAction('contacts/addItemSuccess')
export const addItemError = createAction('contacts/addItemError')

export const deleteRequest = createAction('contacts/deleteRequest')
export const deleteSuccess = createAction('contacts/deleteSuccess')
export const deleteError = createAction('contacts/deleteError')
