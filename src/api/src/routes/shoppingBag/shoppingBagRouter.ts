import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../Responser'
import { getShoppingBag, addShoppingBag } from './shoppingBagController'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getShoppingBag(req, res)
      break

    case 'POST':
      await addShoppingBag(req, res)
      break

    default: {
      const response = Responser.getMethodNotAllowed(req.method)

      res.status(response.status).json(response)
      break
    }
  }
}
export default handler
