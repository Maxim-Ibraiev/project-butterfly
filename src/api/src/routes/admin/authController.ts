import { NextApiRequest, NextApiResponse } from 'next'
import { adminLogin } from './authModel'
import { IResponse, IProductObject } from '../../../../interfaces'
import Responser from '../Responser'

export async function login(
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<IProductObject[]>> {
  try {
    let response = null

    try {
      const { data: responseData } = await adminLogin(req.body)

      response = Responser.getOK(responseData.data)
    } catch (error) {
      response = Responser.getForbidden(error)
    }

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
