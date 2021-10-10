import { NextApiRequest, NextApiResponse } from 'next'
import httpStatusCode from '../httpStatusCode'

export default function MethodNotAllowed(req: NextApiRequest, res: NextApiResponse) {
  res.status(httpStatusCode.METHOD_NOT_ALLOWED).json({
    status: httpStatusCode.METHOD_NOT_ALLOWED,
    data: null,
    message: `Method "${req.method}" not allowed`,
  })
}
