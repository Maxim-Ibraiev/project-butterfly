import { WritableDraft } from 'immer/dist/internal'
import { HYDRATE } from 'next-redux-wrapper'
import { createReducer, combineReducers } from '@reduxjs/toolkit'
import {
  productsSuccess,
  productsError,
  setSelectedProducts,
  setSelectedSizeOfProduct,
  selectedProductsSuccess,
} from './mainActions'
import { ProductStructure } from '../../helpers'
import { IError, IState, IShotSelectedProducts, IProduct, IProductObject } from '../../interfaces'
import { getProductsForRedux, getError, getSelectedProductsForRedux } from '../selectors'

interface IPayload<T> {
  payload: T
}

const products = createReducer([], {
  [HYDRATE]: (_, { payload }: IPayload<IState>) => getProductsForRedux(payload),
  [productsSuccess.type]: (_, { payload }: IPayload<IProductObject[]>) => payload,
  [setSelectedSizeOfProduct.type]: handleSelectedSizeOfProduct,
})

const selectedProducts = createReducer<IProductObject[]>([], {
  [HYDRATE]: (_, { payload }: IPayload<IState>) => getSelectedProductsForRedux(payload),
  [selectedProductsSuccess.type]: (_, { payload }: IPayload<IProduct[]>) => payload.map(el => el.toObject()),
  [setSelectedProducts.type]: (_, { payload }: IPayload<IProduct[]>) => payload.map(el => el.toObject()),
  [setSelectedSizeOfProduct.type]: handleSelectedSizeOfProduct,
})

const error = createReducer<IError>(null, {
  [HYDRATE]: (_, { payload }) => (getError(payload) ? { ...getError(payload) } : getError(payload)),
  [productsSuccess.type]: () => null,
  [productsError.type]: (_, { payload }) => payload,
})

function handleSelectedSizeOfProduct(
  productsOfRedux: WritableDraft<IProductObject[]>,
  { payload }: IPayload<IShotSelectedProducts>
) {
  return productsOfRedux.map(prd => {
    const product = new ProductStructure(prd)
    const selectedSize = payload.find(el => el.id === product.getId())?.selectedSize
    return selectedSize && selectedSize.length > 0
      ? { ...product.toObject(), selectedSize }
      : product.toObject()
  })
}

export default combineReducers({
  products,
  selectedProducts,
  error,
})
