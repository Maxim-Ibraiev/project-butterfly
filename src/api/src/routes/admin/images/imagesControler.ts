import { NextApiHandler } from 'next'
import { IProductObject, IResponse } from '../../../../../interfaces'
import serverApi from '../../../../serverApi'
import RequestValidator from '../../RequestValidator'
import Responser from '../../Responser'
import ImageCloud from '../ImageCloud'
import { ImageOptions } from '../ImageCloud/ImageCloud'
import fileReader from '../product/fileReader'

export const updateAdd: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject['images']> = null
  const { files, fields } = await fileReader(req)
  const imageOptions = JSON.parse(fields.imageOptions) as ImageOptions

  imageOptions.id = Math.round(Math.random() * 10000).toString()

  // validation
  const fileError = RequestValidator.fileListToAdd(files).error
  const optionsError = RequestValidator.imageOptions(imageOptions).error
  const validationError = fileError || optionsError
  if (validationError) response = Responser.getBadRequest(validationError)
  if (response) res.status(response.status).json(response)
  if (response) return

  try {
    // add image
    await ImageCloud.imageUploader(files, imageOptions)

    response = Responser.getOK(ImageCloud.imageParser(files, imageOptions))

    res.status(response.status).json(response)
  } catch (error) {
    response = Responser.getServerError(error)
    res.status(response.status).json(response)
  }
}

export const updateImages: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject['images']> = null
  const { files, fields } = await fileReader(req)
  const productId = JSON.parse(fields.id)
  const imageOptions = JSON.parse(fields.imageOptions) as ImageOptions

  imageOptions.id = Math.round(Math.random() * 10000).toString()

  // validation
  const fileError = RequestValidator.fileListToUpdate(files).error
  const optionsError = RequestValidator.imageOptions(imageOptions).error
  const idError = RequestValidator.id(productId).error
  const validationError = fileError || optionsError || idError
  if (validationError) response = Responser.getBadRequest(validationError)
  if (response) res.status(response.status).json(response)
  if (response) return

  try {
    const products = await serverApi.getProducts()
    const product = products.data.find(el => el.id === productId)

    // delete images
    product.images.forEach(image => {
      const isNotMatch = !imageOptions.preImages.some(el => el.original.includes(image.original))
      if (isNotMatch) {
        ImageCloud.deleteImage(image)
        console.log('image delete:', image)
      }
    })

    // add image
    await ImageCloud.imageUploader(files, imageOptions)

    response = Responser.getOK(ImageCloud.imageParser(files, imageOptions))

    res.status(response.status).json(response)
  } catch (error) {
    response = Responser.getServerError(error)
    res.status(response.status).json(response)
  }
}
