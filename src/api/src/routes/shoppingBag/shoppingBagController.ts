import { NextApiRequest, NextApiResponse } from 'next'
import { getShoppingBagFromDB, setShoppingBag } from './shoppingBagModel'
import { IResponse, IShoppingBag } from '../../../../interfaces'
import RequestValidator from '../RequestValidator'
import Responser from '../Responser'

export async function getShoppingBag(
  req: NextApiRequest | { query: { id: string | string[] } },
  res?: NextApiResponse
): Promise<IResponse<IShoppingBag>> {
  try {
    let response = null
    const { id } = req.query
    const isSingleId = typeof id === 'string'
    const { error } = RequestValidator.id(id)
    const shoppingBag = !error && isSingleId && (await getShoppingBagFromDB(id))

    response = error ? Responser.getBadRequest(error) : Responser.getOK(shoppingBag)

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}

export async function addShoppingBag(
  req: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<IShoppingBag>> {
  try {
    let response = null
    const { body, query } = req
    const id = typeof query.id === 'string' ? query.id : null
    const { error } = RequestValidator.shoppingBag(body)
    const shoppingBag = !error ? await setShoppingBag(body, id) : null

    response = error ? Responser.getBadRequest(error) : Responser.getOK(shoppingBag)

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
