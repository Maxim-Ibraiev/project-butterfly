import { NextApiRequest, NextApiResponse } from 'next'
import { add, edit, productDelete } from './productControler'
import Responser from '../../Responser'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      await add(req, res)
      break
    }

    case 'PATCH': {
      await edit(req, res)
      break
    }

    case 'DELETE': {
      await productDelete(req, res)
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
