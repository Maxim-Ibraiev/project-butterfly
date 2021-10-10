import { NextApiRequest, NextApiResponse } from 'next'
import httpStatusCode from '../../httpStatusCode'
import { listProducts } from './productsModel'

export async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await listProducts()

    if (products) {
      res.status(httpStatusCode.OK).json({ status: httpStatusCode.OK, data: products })
    } else {
      res.status(httpStatusCode.NOT_FOUND).json({ status: httpStatusCode.NOT_FOUND, message: 'Not Found' })
    }
  } catch (e) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: httpStatusCode.INTERNAL_SERVER_ERROR, data: e, message: e.message })
  }
}
