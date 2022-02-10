import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById, getSelectedProducts } from '../redux/selectors'
import * as actions from '../redux/main/mainActions'
import { IProduct, IState } from '../interfaces'

export interface ISelectedAndSavedProducts {
  selectedSize: number
  id: string
}
const getDataFromStorage = (): ISelectedAndSavedProducts[] =>
  JSON.parse(localStorage.getItem('selectedProducts')) || []

const isProductsFromReduxSame = (selectedProductFromRedux: IProduct[]) => {
  if (selectedProductFromRedux.length > 0 || selectedProductFromRedux.length === getDataFromStorage.length)
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

const setProductsInLocalStorage = (newSelectedProducts: IProduct[]) =>
  localStorage.setItem(
    'selectedProducts',
    JSON.stringify(newSelectedProducts.map(el => ({ selectedSize: el.getSelectedSize(), id: el.getId() })))
  )

export default function useSelectedProducts(): [IProduct[], (newSelectedProducts: IProduct[]) => void] {
  if (!process.browser) return [[], () => null]

  const dispatch = useDispatch()
  const state = useSelector<IState, IState>(s => s)
  const selectedProductFromRedux = useSelector(getSelectedProducts)
  const getProductsFromLocalStorage = () =>
    getDataFromStorage() ? getDataFromStorage().map(({ id }) => id && getProductById(state, id)) : []

  const setProducts = (newSelectedProducts: IProduct[]) => {
    setProductsInLocalStorage(newSelectedProducts)
    dispatch(actions.setSelectedProducts(newSelectedProducts.map(el => el.toObject())))
  }

  useEffect(() => {
    if (!isProductsFromReduxSame(selectedProductFromRedux)) {
      setProductsInLocalStorage(selectedProductFromRedux)
    }
  }, [selectedProductFromRedux])

  useEffect(() => {
    if (!isProductsFromLocalStorageSame(selectedProductFromRedux)) {
      const newSelectedProducts = getProductsFromLocalStorage().map(el => el.toObject())

      dispatch(actions.setSelectedProducts(newSelectedProducts))
      getDataFromStorage().map(el => dispatch(actions.setSelectedSizeOfProduct(el)))
    }
  })

  return [selectedProductFromRedux, setProducts]
}
