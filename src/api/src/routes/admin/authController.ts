import { AxiosError } from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'
import getConfig from 'next/config'
import { adminLogin } from './authModel'
import { IResponse, IAdmin } from '../../../../interfaces'
import RequestValidator from '../RequestValidator'
import Responser from '../Responser'

const { sessionOptions } = getConfig().serverRuntimeConfig

export const login = withIronSessionApiRoute(async (req, res) => {
  try {
    let response: IResponse<IAdmin> = null

    try {
      const { error } = RequestValidator.adminLogin(req.body)
      const { data: responseData } = !error && (await adminLogin(req.body))

      response = error ? Responser.getBadRequest(error) : Responser.getOK(responseData.data)
    } catch (e) {
      const error = e as AxiosError

      if (error?.response?.status === 403) response = Responser.getForbidden(e.response.data)
      else response = Responser.getServerError(e.response.data)
    }

    if (res) {
      Object.assign(req.session, { admin: response.data })
      await req.session.save()
      res.status(response.status).json(response)
    }

    return response
  } catch (e) {
    const response = Responser.getServerError(e)

    if (res) res.status(response.status).json(response)

    return response
  }
}, sessionOptions)

export const logout = withIronSessionApiRoute(async (req, res) => {
  req.session.destroy()

  const response = Responser.getOK<IAdmin>({ auth: false, name: null })

  if (res) res.status(response.status).json(response)

  return response
}, sessionOptions)
