import { NextApiRequest, NextApiResponse } from 'next'
import { createProduct } from './addController'
import Responser from '../../Responser'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await createProduct(req, res)
      break

    default: {
      const response = Responser.getMethodNotAllowed(req.method)

      res.status(response.status).json(response)
      break
    }
  }
}
export default handler
