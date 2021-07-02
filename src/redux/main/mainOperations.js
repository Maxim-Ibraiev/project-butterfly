import { categoriesSuccess, categoriesError } from './mainActions'

export const setCategories = data => dispatch => {
  if (Array.isArray(data)) {
    dispatch(categoriesSuccess(data.categories))
  } else {
    dispatch(categoriesError(data.message))
  }
}
