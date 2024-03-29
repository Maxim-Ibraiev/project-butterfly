import { NextApiRequest, NextApiResponse } from 'next'
import { listCategories } from './categoriesModel'
import { Categories, IResponse } from '../../../../interfaces'
import Responser from '../Responser'

export const getCategories = async (
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<Categories>> => {
  try {
    const categoriesResponse = await listCategories()
    const categoriesToFlat = categoriesResponse.map<string>(el => el.category)
    const response = Responser.getOK(categoriesToFlat)

    if (res) res.status(response.status).json(response)

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
