import { NextApiRequest, NextApiResponse } from 'next'
import httpStatusCodes from '../../httpStatusCodes'
import { listProducts } from './productsModel'
import getServerError from '../getServerError'
import { IResponse, IProductObject } from '../../../../interfaces'

export async function getProducts(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<IProductObject[]>> {
  try {
    const products = await listProducts()
    const response = {
      data: products,
      status: products.length > 0 ? httpStatusCodes.OK : httpStatusCodes.NOT_FOUND,
      error: null,
    }

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
