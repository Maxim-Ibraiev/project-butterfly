import axios, { AxiosResponse } from 'axios'
import requestSymulator from './requestSymulator'
import { getShotSelectedProducts } from '../helpers'
import { ICallRequest, IProduct, IResponse, IShoppingBag, ILoginData, IAdmin } from '../interfaces'
import { ProductToUpdate } from '../interfaces/interfaces'
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

  admin: {
    login: (body: ILoginData): Promise<IResponse<IAdmin>> =>
      axios.post(routes.api.adminLogin, body).then(res => res.data),

    logout: (): Promise<IResponse<IAdmin>> => axios.get(routes.api.adminLogin).then(res => res.data),

    addProduct: (files: File[], body) => {
      const formData = new FormData()

      formData.append('data', JSON.stringify(body))
      files.forEach(file => {
        formData.append('myImage', file)
      })

      return axios.post(routes.api.adminProduct, formData)
    },

    editProduct: (files: File[], productToUpdate: ProductToUpdate) => {
      const formData = new FormData()

      files.forEach((file, ind) => {
        if (file) formData.append(`image-${ind}`, file)
      })

      formData.append('data', JSON.stringify(productToUpdate))

      return axios.patch(routes.api.adminProduct, formData)
    },
  },

  callRequest: async (data: ICallRequest): Promise<IResponse<null>> => {
    const resolve = await requestSymulator(data)

    return resolve
  },
}

export default api
