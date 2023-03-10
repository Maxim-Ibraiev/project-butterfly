import { NextApiRequest, NextApiResponse } from 'next'
import { listProducts } from './productsModel'
import { IResponse, IProductObject } from '../../../../interfaces'
import Responser from '../Responser'

export async function getProducts(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<IProductObject[]>> {
  try {
    const products = await listProducts()

    const response = Responser.getOK(products)

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
