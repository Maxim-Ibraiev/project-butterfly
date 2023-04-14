import axios, { AxiosResponse } from 'axios'
import requestSymulator from './requestSymulator'
import { ImageOptions } from './src/routes/admin/ImageCloud/ImageCloud'
import { getShotSelectedProducts } from '../helpers'
import { ICallRequest, IProduct, IResponse, IShoppingBag, ILoginData, IAdmin } from '../interfaces'
import { IProductObject, ProductToUpdate } from '../interfaces/interfaces'
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

    addProduct: body => axios.post(routes.api.adminProduct, body),
    editProduct: (id: string, productToUpdate: ProductToUpdate) =>
      axios.patch(routes.api.adminProduct, { id, product: productToUpdate }),

    imageAdd: async (files: File[], options: Omit<ImageOptions, 'id'>) => {
      const formData = new FormData()
      formData.append('imageOptions', JSON.stringify(options))

      files.forEach(file => {
        if (file) formData.append('images', file)
      })

      return (await axios.post(routes.api.adminImags, formData)).data as IResponse<IProductObject['images']>
    },
    imageUpdate: async (id: string, files: File[], options: Omit<ImageOptions, 'id'>) => {
      const formData = new FormData()
      formData.append('id', JSON.stringify(id))
      formData.append('imageOptions', JSON.stringify(options))

      files.forEach((file, ind) => {
        if (file) formData.append(`image-${ind}`, file)
      })

      return (await axios.patch(routes.api.adminImags, formData)).data as IResponse<IProductObject['images']>
    },
  },

  callRequest: async (data: ICallRequest): Promise<IResponse<null>> => {
    const resolve = await requestSymulator(data)

    return resolve
  },
}

export default api
