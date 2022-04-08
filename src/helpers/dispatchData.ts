import { Dispatch } from 'redux'
import * as actions from '../redux/main/mainActions'
import { Categories, IProductObject, IResponse, IShoppingBag } from '../interfaces'
import { getProductStructure } from '../redux/selectors'

interface IDispatchData {
  products: IResponse<IProductObject[]>
  categories: IResponse<Categories>
  shoppingBag?: IResponse<IShoppingBag>
}

export default async function dispatchData(
  dispatch: Dispatch,
  { shoppingBag, categories, products }: IDispatchData
) {
  const isNeedToHandleError =
    (products.error || categories.error || shoppingBag?.error) && process.env.NODE_ENV === 'development'

  if (isNeedToHandleError) {
    dispatch(actions.productsError(products.error))
    dispatch(actions.categoriesError(categories.error))

    throw new Error(
      `DispatchData error. products: ${products}, category: ${categories}, shoppingBag: ${shoppingBag}`
    )
  }

  dispatch(actions.productsSuccess(products.data))
  dispatch(actions.categoriesSuccess(categories.data))

  if (shoppingBag) {
    const productList = getProductStructure(products.data)
    const selectedProducts = shoppingBag.data.selectedProducts.map(el =>
      productList.find(prd => prd.getId() === el.id)
    )

    dispatch(actions.selectedProductsSuccess(selectedProducts))
    dispatch(actions.setSelectedSizeOfProduct(shoppingBag.data.selectedProducts))
  }
}
