import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById, getSelectedProducts } from '../redux/selectors'
import * as actions from '../redux/main/mainActions'
import { IProduct, IState } from '../interfaces'

export default function useSelectedProducts(): [IProduct[], (newSelectedProducts: IProduct[]) => void] {
  if (!process.browser) return [[], () => null]

  const dispatch = useDispatch()
  const state = useSelector<IState, IState>(s => s)
  const selectedProductFromRedux = useSelector(getSelectedProducts)
  const storageId: string[] = JSON.parse(localStorage.getItem('selectedProducts'))
  const selectedProductsFromStorage = storageId ? storageId.map(id => id && getProductById(state, id)) : []
  const isProductsSame = selectedProductsFromStorage.every(productFromLocalStorage =>
    selectedProductFromRedux.some(
      productFromStore => productFromLocalStorage?.getId() === productFromStore?.getId()
    )
  )

  useEffect(() => {
    if (!isProductsSame) {
      const newSelectedProducts = Array.from(selectedProductsFromStorage.map(el => el.toObject()))
      dispatch(actions.setSelectedProducts(newSelectedProducts))
    }
  })

  const setProducts = (newSelectedProducts: IProduct[]) => {
    if (newSelectedProducts === selectedProductFromRedux && process.env.NODE_ENV === 'development') {
      throw Error('do not mutate the array')
    }

    localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts.map(el => el.getId())))
    dispatch(actions.setSelectedProducts([...newSelectedProducts.map(el => el.toObject())]))
  }

  return [selectedProductFromRedux, setProducts]
}
