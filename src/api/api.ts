import axios, { AxiosResponse } from 'axios'
import { IProduct, IResponse, IShoppingBag } from '../interfaces'
import routes from '../routes'
import { getShotSelectedProducts } from '../helpers'

const api = {
  getShoppingBag: (id: string) => axios.get(routes.api.getShoppingBag(id)),
  setShoppingBag: (
    id: string,
    selectedProducts: IProduct[]
  ): Promise<AxiosResponse<IResponse<IShoppingBag>>> =>
    axios.post(routes.api.getShoppingBag(id), {
      selectedProducts: getShotSelectedProducts(selectedProducts),
    }),
}

export default api
