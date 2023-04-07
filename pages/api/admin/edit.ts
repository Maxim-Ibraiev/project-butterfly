import { File } from 'formidable'
import { NextApiHandler } from 'next'
import serverApi from '../../../src/api/serverApi'
import { updateProduct } from '../../../src/api/src/routes/admin/add/addModel'
import fileReader from '../../../src/api/src/routes/admin/add/fileReader'
import imageParser from '../../../src/api/src/routes/admin/add/imageParser'
import queryParser from '../../../src/api/src/routes/admin/add/queryParcer'
import ImageCloud from '../../../src/api/src/routes/admin/ImageCloud'
import RequestValidator from '../../../src/api/src/routes/RequestValidator'
import Responser from '../../../src/api/src/routes/Responser'
import { arrayWrapper } from '../../../src/helpers'
import { IProductObject, IProductToAdd, IResponse } from '../../../src/interfaces'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
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

    // update product
    const products = await serverApi.getProducts()
    const product = products.data.find(el => el.id === data.id)
    const images = imageParser(files, {
      color: data.color,
      id: imageId,
      title: data.title,
      preImages: product.images,
    })
    data.images = images
    const id = data.id
    delete data.id

    try {
      // add image
      const arrFiles = Object.values(files).map(el => arrayWrapper(el)[0])
      ImageCloud.imageUploader(arrFiles, data.title, imageId)

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

export default handler
