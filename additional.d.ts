import { Db } from 'mongodb'

declare module '*.scss'

declare global {
  namespace NodeJS {
    interface Global {
      _mongoDb?: Db
    }
  }
}
