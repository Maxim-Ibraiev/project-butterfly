/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import connectToDatabase from '../../db/connectToDatabase'
import { IProductObject } from '../../../../interfaces'

interface IResponse extends IProductObject {
  _id: unknown
}

export const listProducts = async (): Promise<IProductObject[]> => {
  const { db } = await connectToDatabase()

  const response = await db.collection<IResponse>('products').find().toArray()
  const products: IProductObject[] = response.map(el => {
    el.id = String(el._id)
    delete el._id
    delete el.createdAt
    delete el.updatedAt

    for (const [key, value] of Object.entries(el)) {
      if (Array.isArray(value)) {
        el[key].forEach(element => {
          delete element._id
        })
      }
    }

    return el
  })

  return products
}
