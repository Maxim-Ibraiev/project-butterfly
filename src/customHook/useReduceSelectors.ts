import { useSelector } from 'react-redux'
import { IProduct, IState } from '../interfaces'
import * as selectors from '../redux/selectors'

export default function useReduceSelectors() {
  const categories = useSelector(selectors.getCategories)
  const products = useSelector(selectors.getProducts)
  const selectedProducts = useSelector(selectors.getSelectedProducts)
  const error = useSelector(selectors.getError)

  const getProductById = (id: string) => useSelector<IState, IProduct>(s => selectors.getProductById(s, id))
  const getProductsByModel = (model: string) =>
    useSelector<IState, IProduct[]>(s => selectors.getProductsByModel(s, model))

  return {
    categories,
    products,
    selectedProducts,
    error,
    getProductById,
    getProductsByModel,
  }
}
