import { NextApiRequest, NextApiResponse } from 'next'
import httpStatusCodes from '../../httpStatusCodes'
import { listProducts } from './productsModel'
import Responser from '../Responser'
import { IResponse, IProductObject } from '../../../../interfaces'
import cashedProducts from '../../../../constants/PRODUCTS'

export async function getProducts(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<IProductObject[]>> {
  if (process.env.CASH_DEV_MODE) {
    return { status: httpStatusCodes.OK, data: cashedProducts, error: null }
  }

  try {
    const products = await listProducts()
    const response = Responser.getOK({ data: products })

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
