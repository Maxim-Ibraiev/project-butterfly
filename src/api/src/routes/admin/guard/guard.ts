import { IronSessionData, getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import Responser from '../../Responser'

export default async function guard(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getIronSession(
    req,
    res,
    getConfig().serverRuntimeConfig.sessionOptions
  )) as IronSessionData

  if (!session.admin.auth) {
    return Responser.getForbidden(new Error('Admin not logIn'))
  }

  return null
}
