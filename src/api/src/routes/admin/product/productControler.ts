import { NextApiHandler } from 'next'
import fileReader from './fileReader'
import { addProduct, updateProduct } from './productModel'
import queryParser from './queryParcer'
import { IProductObject, IProductToAdd, IResponse } from '../../../../../interfaces'
import serverApi from '../../../../serverApi'
import RequestValidator from '../../RequestValidator'
import Responser from '../../Responser'
import ImageCloud from '../ImageCloud'

export const edit: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject> = null
  const imageId = Math.round(Math.random() * 10000).toString()

  try {
    const { files, fields } = await fileReader(req)
    const data = queryParser(fields.data)

    // validation
    const fileError = RequestValidator.fileListToUpdate(files).error
    const productError = RequestValidator.receivingproductforUpdate(data).error
    if (productError) response = Responser.getBadRequest(productError)
    if (fileError) response = Responser.getBadRequest(fileError)
    if (response) res.status(response.status).json(response)
    if (response) return

    const products = await serverApi.getProducts()
    const product = products.data.find(el => el.id === data.id)

    try {
      const imageOptions = { title: data.title, id: imageId, color: data.color, preImages: product.images }
      data.images = ImageCloud.imageParser(files, imageOptions)

      const id = data.id
      delete data.id

      // add image
      const x = ImageCloud.imageUploader(files, imageOptions)
      console.log(x)

      // update product
      const productResponse = await updateProduct(id, data)

      response = Responser.getOK(productResponse)
    } catch (error) {
      console.error('Files/product adding error')

      response = Responser.getServerError(error)
    }

    res.status(response.status).json(response)
  } catch (error) {
    response = Responser.getServerError(error)
    res.status(response.status).json(response)
  }
}

export const add: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject> = null
  const imageId = Math.round(Math.random() * 10000).toString()

  try {
    const { files, fields } = await fileReader(req)
    const query = queryParser(fields.data)
    const imageOptions = { color: query.color, id: imageId, title: query.title }
    const product: IProductToAdd = {
      popularity: 0,
      ...query,
      images: ImageCloud.imageParser(files, imageOptions),
    }
    const fileError = RequestValidator.fileList(files).error
    const productError = RequestValidator.product(product).error

    if (productError) response = Responser.getBadRequest(productError)
    if (fileError) response = Responser.getBadRequest(fileError)
    if (response) res.status(response.status).json(response)
    if (response) return

    try {
      // add image
      ImageCloud.imageUploader(files, imageOptions)

      // add products
      const productResponse = await addProduct(product)
      response = Responser.getOK(productResponse)
    } catch (error) {
      response = Responser.getServerError(error)
    }

    res.status(response.status).json(response)
  } catch (error) {
    response = Responser.getServerError(error)
    res.status(response.status).json(response)
  }
}
