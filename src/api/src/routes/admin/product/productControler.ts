import { NextApiHandler } from 'next'
import fileReader from './fileReader'
import { addProduct, updateProduct } from './productModel'
import { IProductObject, IResponse } from '../../../../../interfaces'
import RequestValidator from '../../RequestValidator'
import Responser from '../../Responser'

export const edit: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject> = null

  try {
    const data = req.body.product
    const id = req.body.id
    delete data.id

    // validation
    const productError = RequestValidator.productUpdate(data).error
    const idError = RequestValidator.id(id).error
    if (productError) response = Responser.getBadRequest(productError)
    if (idError) response = Responser.getBadRequest(idError)
    if (response) res.status(response.status).json(response)
    if (response) return

    try {
      // update product
      const productResponse = await updateProduct(id, data)

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

export const add: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject> = null

  try {
    const data = req.body

    // validation
    const productError = RequestValidator.product(data).error
    if (productError) response = Responser.getBadRequest(productError)
    if (response) res.status(response.status).json(response)
    if (response) return

    try {
      // add products
      const productResponse = await addProduct(data)
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

export const productDelete: NextApiHandler = async (req, res) => {
  const { fields } = await fileReader(req)
  console.log('fields:', fields)
}
