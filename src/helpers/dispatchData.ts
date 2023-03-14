import { Dispatch } from 'redux'
import { IProductObject, IResponse, IShoppingBag } from '../interfaces'
import * as actions from '../redux/main/mainActions'
import { getProductStructure } from '../redux/selectors'

interface IDispatchData {
  products: IResponse<IProductObject[]>
  shoppingBag?: IResponse<IShoppingBag>
}

export default async function dispatchData(dispatch: Dispatch, { shoppingBag, products }: IDispatchData) {
  const isNeedToHandleError = (products.error || shoppingBag?.error) && process.env.NODE_ENV === 'development'

  if (isNeedToHandleError) {
    dispatch(actions.productsError(products.error))

    console.warn({
      products: JSON.stringify(products),
      shoppingBag: JSON.stringify(shoppingBag),
    })

    throw new Error(`DispatchData error.`)
  }

  dispatch(actions.productsSuccess(products.data))

  if (shoppingBag) {
    const productList = getProductStructure(products.data)
    const selectedProducts = shoppingBag.data.selectedProducts.map(el =>
      productList.find(prd => prd.getId() === el.id)
    )

    dispatch(actions.selectedProductsSuccess(selectedProducts))
    dispatch(actions.setSelectedSizeOfProduct(shoppingBag.data.selectedProducts))
  }
}
