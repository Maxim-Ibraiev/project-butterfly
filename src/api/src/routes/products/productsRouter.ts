import { NextApiRequest, NextApiResponse } from 'next'
import MethodNotAllowed from '../MethodNotAllowed'
import { getProducts } from './productsController'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getProducts(req, res)
      break

    default:
      await MethodNotAllowed(req, res)
      break
  }
}
export default handler
