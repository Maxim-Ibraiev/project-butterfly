import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../Responser'
import { getCategories } from './categoriesController'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getCategories(req, res)
      break

    default: {
      const response = Responser.getMethodNotAllowed(req.method)

      res.status(response.status).json(response)
      break
    }
  }
}
export default handler
