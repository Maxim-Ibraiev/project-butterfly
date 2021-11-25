import { NextApiRequest, NextApiResponse } from 'next'
import httpStatusCodes from '../../httpStatusCodes'
import { listCategories } from './categoriesModel'
import getServerError from '../getServerError'
import { Categories, IResponse } from '../../../../interfaces'
import cashedCategories from '../../../../constants/categories'

export const getCategories = async (
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<IResponse<Categories>> => {
  if (process.env.CASH_DEV_MODE) {
    return { status: httpStatusCodes.OK, data: cashedCategories, error: null }
  }

  try {
    const categoriesResponse = await listCategories()
    const categoriesToFlat = categoriesResponse.map(el => el.category)
    const response = { status: httpStatusCodes.OK, data: categoriesToFlat, error: null }

    if (res) res.status(httpStatusCodes.OK).json(response)

    return response
  } catch (e) {
    const response = getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}
