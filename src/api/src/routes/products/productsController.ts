import { NextApiRequest, NextApiResponse } from 'next'
import { listProducts } from './productsModel'
// import cashedProducts from '../../../../constants/PRODUCTS'
import { IResponse, IProductObject } from '../../../../interfaces'
import Responser from '../Responser'

export async function getProducts(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<IProductObject[]>> {
  // if (process.env.CASH_DEV_MODE) {
  //   return { status: httpStatusCodes.OK, data: cashedProducts, error: null }
  // }

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
