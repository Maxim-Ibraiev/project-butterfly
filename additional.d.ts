import { Db } from 'mongodb'
import { IAdmin } from './src/interfaces'

declare module '*.scss'

declare global {
  namespace NodeJS {
    interface Global {
      _mongoDb?: Db
    }
  }
}

declare module 'iron-session' {
  interface IronSessionData {
    admin?: IAdmin
  }
}
