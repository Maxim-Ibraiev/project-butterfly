import { useDispatch, useSelector } from 'react-redux'
import { getProductById, getSelectedProducts } from '../redux/selectors'
import * as actions from '../redux/main/mainActions'

import { IProduct, IState } from '../interfaces'

export default function useSelectedProducts(): [IProduct[], (newSelectedProducts: IProduct[]) => void] {
  if (!process.browser) return [[], () => null]

  const dispatch = useDispatch()
  const state = useSelector<IState, IState>(s => s)
  const selectedProductFormRedux = useSelector(getSelectedProducts)
  const storageId: string[] = JSON.parse(localStorage.getItem('selectedProducts'))
  const selectedProductsFromStorage = storageId ? storageId.map(id => getProductById(state, id)) : []
  const isProductsSame = selectedProductsFromStorage.every(productFromLocalStorage =>
    selectedProductFormRedux.some(productFormStore => productFromLocalStorage.id === productFormStore.id)
  )

  if (!isProductsSame) dispatch(actions.setSelectedProducts([...selectedProductsFromStorage]))

  const setProducts = (newSelectedProducts: IProduct[]) => {
    if (newSelectedProducts === selectedProductFormRedux) {
      throw Error('do not mutate the array')
    }

    localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts.map(el => el.id)))
    dispatch(actions.setSelectedProducts([...newSelectedProducts]))
  }

  return [selectedProductFormRedux, setProducts]
}
