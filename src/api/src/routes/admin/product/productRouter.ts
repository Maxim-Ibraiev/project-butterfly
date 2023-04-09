import { NextApiRequest, NextApiResponse } from 'next'
import { add, edit } from './productControler'
import Responser from '../../Responser'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      add(req, res)
      break
    }

    case 'PATCH': {
      edit(req, res)
      break
    }

    default:
      {
        const response = Responser.getMethodNotAllowed(req.method)

        res.status(response.status).json(response)
      }
      break
  }
}
