import { Db } from 'mongodb'
import { ImageOptions } from './src/api/src/routes/admin/ImageCloud/ImageCloud'
import { ProductReceivingForUpdate, IProductObject } from './src/interfaces'

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

declare module 'formidable' {
  interface Fields {
    id?: IProductObject['id']
    imageOptions?: string
  }
}
