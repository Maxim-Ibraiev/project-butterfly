import { NextApiRequest, NextApiResponse } from 'next'
import MethodNotAllowed from '../MethodNotAllowed'
import { getCategories } from './categoriesController'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getCategories(req, res)
      break

    default:
      await MethodNotAllowed(req, res)
      break
  }
}
export default handler
