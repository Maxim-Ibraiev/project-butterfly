import { NextApiRequest, NextApiResponse } from 'next'
import { login, logout } from './authController'
import Responser from '../../Responser'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await login(req, res)
      break

    case 'GET':
      await logout(req, res)
      break

    default: {
      const response = Responser.getMethodNotAllowed(req.method)

      res.status(response.status).json(response)
      break
    }
  }
}
export default handler
