import { createReducer, combineReducers } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { HYDRATE } from 'next-redux-wrapper'
import {
  categoriesSuccess,
  categoriesError,
  productsSuccess,
  productsError,
  setSelectedProducts,
  setSelectedSizeOfProduct,
} from './mainActions'
import { getCategories } from '../selectors'
import { Categories, IProductObject, IError, IState, ISelectedProductsFromStorage } from '../../interfaces'

const categories = createReducer<Categories>([], {
  [HYDRATE]: (_, { payload }) => [...getCategories(payload)],
  [categoriesSuccess.type]: (_, { payload }) => payload,
})

const products = createReducer<IProductObject[]>([], {
  [HYDRATE]: (_, { payload }: { payload: IState }) => payload.main.products,
  [productsSuccess.type]: (_, { payload }) => payload,
  [setSelectedSizeOfProduct.type]: handleSelectedSizeOfProduct,
})

const selectedProducts = createReducer<IProductObject[]>([], {
  [HYDRATE]: (_, { payload }: { payload: IState }) => payload.main.selectedProducts,
  [setSelectedProducts.type]: (_, { payload }) => payload,
  [setSelectedSizeOfProduct.type]: handleSelectedSizeOfProduct,
})

const error = createReducer<IError>(null, {
  [HYDRATE]: (_, { payload }) => (payload.main.error ? { ...payload.main.error } : payload.main.error),
  [categoriesSuccess.type]: () => null,
  [productsSuccess.type]: () => null,
  [categoriesError.type]: (_, { payload }) => payload,
  [productsError.type]: (_, { payload }) => payload,
})

function handleSelectedSizeOfProduct(
  productsOfRedux: WritableDraft<IProductObject>[],
  { payload }: { payload: ISelectedProductsFromStorage }
) {
  return productsOfRedux.map(prd => {
    const selectedSize = payload.find(el => el.id === prd.id)?.selectedSize

    return selectedSize ? { ...prd, selectedSize } : prd
  })
}

export default combineReducers({
  categories,
  products,
  selectedProducts,
  error,
})
