import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById, getSelectedProducts } from '../redux/selectors'
import * as actions from '../redux/main/mainActions'
import { IProduct, IState } from '../interfaces'
import { ISelectedProductsFromStorage } from '../interfaces/index'

const setProductsInLocalStorage = (newSelectedProducts: IProduct[]) =>
  localStorage.setItem(
    'selectedProducts',
    JSON.stringify(newSelectedProducts.map(el => ({ selectedSize: el.getSelectedSize(), id: el.getId() })))
  )

const getDataFromStorage = (): ISelectedProductsFromStorage => {
  const data = JSON.parse(localStorage.getItem('selectedProducts'))
  const isDataContainId = data && data.every(({ id }) => id)

  if (isDataContainId && data) return data

  setProductsInLocalStorage([])

  return []
}

const isProductsFromReduxSame = (selectedProductFromRedux: IProduct[]) => {
  if (selectedProductFromRedux.length > 0 || selectedProductFromRedux.length === getDataFromStorage().length)
    return selectedProductFromRedux.every(productFromRedux =>
      getDataFromStorage().some(
        productFromLocalStorage =>
          productFromLocalStorage?.id === productFromRedux?.getId() &&
          productFromLocalStorage?.selectedSize === productFromRedux?.getSelectedSize()
      )
    )

  return false
}

const isProductsFromLocalStorageSame = (selectedProductFromRedux: IProduct[]) => {
  const dataFromStorage = getDataFromStorage()

  if (dataFromStorage.length > 0)
    return dataFromStorage.every(productFromLocalStorage =>
      selectedProductFromRedux.some(
        productFromRedux =>
          productFromLocalStorage?.id === productFromRedux?.getId() &&
          productFromLocalStorage?.selectedSize === productFromRedux?.getSelectedSize()
      )
    )

  return false
}

export default function useSelectedProducts(): [IProduct[], (newSelectedProducts: IProduct[]) => void] {
  if (typeof window === 'undefined') return [[], () => null]

  const dispatch = useDispatch()
  const state = useSelector<IState, IState>(s => s)
  const selectedProductFromRedux = useSelector(getSelectedProducts)
  const getProductsFromLocalStorage = () =>
    getDataFromStorage() ? getDataFromStorage().map(({ id }) => id && getProductById(state, id)) : []

  const setProducts = (newSelectedProducts: IProduct[]) => {
    setProductsInLocalStorage(newSelectedProducts)
    dispatch(actions.setSelectedProducts(newSelectedProducts))
  }

  useEffect(() => {
    if (!isProductsFromReduxSame(selectedProductFromRedux)) {
      setProductsInLocalStorage(selectedProductFromRedux)
    }
  }, [selectedProductFromRedux])

  useEffect(() => {
    if (!isProductsFromLocalStorageSame(selectedProductFromRedux)) {
      dispatch(actions.setSelectedProducts(getProductsFromLocalStorage()))
      dispatch(actions.setSelectedSizeOfProduct(getDataFromStorage()))
    }
  }, [])

  return [selectedProductFromRedux, setProducts]
}
