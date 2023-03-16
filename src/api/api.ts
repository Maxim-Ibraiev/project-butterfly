import axios, { AxiosResponse } from 'axios'
import requestSymulator from './requestSymulator'
import { getShotSelectedProducts } from '../helpers'
import { ICallRequest, IProduct, IResponse, IShoppingBag, ILoginData, IAdmin } from '../interfaces'
import routes from '../routes'

const api = {
  getShoppingBag: (id: string) => axios.get(routes.api.getShoppingBag(id)),
  setShoppingBag: (
    id: string,
    selectedProducts: IProduct[]
  ): Promise<AxiosResponse<IResponse<IShoppingBag>>> =>
    axios.post(routes.api.getShoppingBag(id), {
      selectedProducts: getShotSelectedProducts(selectedProducts),
    }),

  adminLogin: (body: ILoginData): Promise<IResponse<IAdmin>> =>
    axios.post(routes.api.adminLogin, body).then(res => res.data),

  adminLogout: (): Promise<IResponse<IAdmin>> => axios.get(routes.api.adminLogin).then(res => res.data),

  callRequest: async (data: ICallRequest): Promise<IResponse<null>> => {
    const resolve = await requestSymulator(data)

    return resolve
  },
}

export default api
