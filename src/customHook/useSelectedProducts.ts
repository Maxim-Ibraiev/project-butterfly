import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SHOPPING_ID } from '../constants'
import { getShotSelectedProducts } from '../helpers'
import { IProduct, IState, IShotSelectedProducts } from '../interfaces'
import * as actions from '../redux/main/mainActions'
import { getProductById, getSelectedProducts } from '../redux/selectors'
import api from '../api/api'

const setLocalStorage = {
  id: (id: string) => localStorage.setItem(SHOPPING_ID, id),
  shotSelectedProducts: (selectedProducts: IShotSelectedProducts) =>
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts)),
}

const setProductsInLocalStorage = async (newSelectedProducts: IProduct[]) => {
  const isClient = typeof window !== 'undefined'
  const shotSelectedProducts = getShotSelectedProducts(newSelectedProducts)

  if (isClient) setLocalStorage.shotSelectedProducts(shotSelectedProducts)

  const userId = isClient && localStorage.getItem(SHOPPING_ID)
  const {
    data: { data },
  } = await api.setShoppingBag(userId, newSelectedProducts)

  if (isClient && !userId) setLocalStorage.id(data.id)
}

export default function useSelectedProducts(): [IProduct[], (newSelectedProducts: IProduct[]) => void] {
  const dispatch = useDispatch()
  const state = useSelector<IState, IState>(s => s)
  const [firstRender, setFirstRender] = useState(true)
  const selectedProductFromRedux = useSelector(getSelectedProducts)

  const getProductsFromLocalStorage = () => {
    const dataFromStorage = getDataFromStorage().map(({ id }) => getProductById(state, id))

    if (dataFromStorage.includes(undefined)) {
      const filteredData = dataFromStorage.filter(Boolean)
      setProductsInLocalStorage(filteredData)

      return filteredData
    }

    return dataFromStorage
  }

  const dispatchProducts = () => {
    dispatch(actions.setSelectedProducts(getProductsFromLocalStorage()))
    dispatch(actions.setSelectedSizeOfProduct(getDataFromStorage()))
  }

  const setProducts = (newSelectedProducts: IProduct[]) => {
    dispatch(actions.setSelectedProducts(newSelectedProducts))
    setProductsInLocalStorage(newSelectedProducts)
  }

  useEffect(() => {
    if (!isProductsFromLocalStorageSame(selectedProductFromRedux)) {
      dispatchProducts()
    }
    setFirstRender(false)
  }, [])

  useEffect(() => {
    const isNeedToDispatch =
      selectedProductFromRedux.length === 0 && getDataFromStorage().length > 0 && !firstRender

    if (!isProductsFromReduxSame(selectedProductFromRedux))
      setProductsInLocalStorage(selectedProductFromRedux)
    else if (isNeedToDispatch) dispatchProducts()
  }, [selectedProductFromRedux])

  return [selectedProductFromRedux, setProducts]
}

function getDataFromStorage(): IShotSelectedProducts {
  const data = JSON.parse(localStorage.getItem('selectedProducts'))

  const isDataContainId = data && data.length > 0 && data.every(({ id }) => id)
  if (isDataContainId && data) return data

  setProductsInLocalStorage([])

  return []
}

function isProductsFromReduxSame(selectedProductFromRedux: IProduct[]) {
  return selectedProductFromRedux.every(productFromRedux =>
    getDataFromStorage().some(
      productFromLocalStorage =>
        productFromLocalStorage?.id === productFromRedux?.getId() &&
        productFromLocalStorage?.selectedSize === productFromRedux?.getSelectedSize()
    )
  )
}

function isProductsFromLocalStorageSame(selectedProductFromRedux: IProduct[]) {
  const dataFromStorage = getDataFromStorage()

  return dataFromStorage.every(productFromLocalStorage =>
    selectedProductFromRedux.some(
      productFromRedux =>
        productFromLocalStorage?.id === productFromRedux?.getId() &&
        productFromLocalStorage?.selectedSize === productFromRedux?.getSelectedSize()
    )
  )
}
