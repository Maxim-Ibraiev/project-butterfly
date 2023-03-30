import { File } from 'formidable'
import { NextApiHandler } from 'next'
import { addProduct } from '../../../src/api/src/routes/admin/add/addModel'
import fileReader from '../../../src/api/src/routes/admin/add/fileReader'
import imageParser from '../../../src/api/src/routes/admin/add/imageParser'
import queryParser from '../../../src/api/src/routes/admin/add/queryParcer'
import ImageCloud from '../../../src/api/src/routes/admin/ImageCloud'
import RequestValidator from '../../../src/api/src/routes/RequestValidator'
import Responser from '../../../src/api/src/routes/Responser'
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
    const query = queryParser(fields.data)
    const product: IProductToAdd = {
      popularity: 0,
      ...query,
      images: imageParser(files, { color: query.color, title: query.title, id: imageId }),
    }
    const fileError = RequestValidator.fileList(files).error
    const productError = RequestValidator.product(product).error

    if (productError) response = Responser.getBadRequest(productError)
    if (fileError) response = Responser.getBadRequest(fileError)
    if (response) res.status(response.status).json(response)
    if (response) return

    // add products
    try {
      const productResponse = await addProduct(product)
      response = Responser.getOK(productResponse)
    } catch (error) {
      response = Responser.getServerError(error)
    }

    // add image
    await ImageCloud.imageUploader(files.myImage, product.title, imageId)

    res.status(response.status).json(response)
  } catch (error) {
    response = Responser.getServerError(error)
    res.status(response.status).json(response)
  }
}

export default handler
