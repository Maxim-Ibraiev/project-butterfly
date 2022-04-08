/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import { IProductObject } from '../../../../interfaces'
import getCollection from '../../db/getCollection'

interface IResponse extends IProductObject {
  _id: unknown
}

export const listProducts = async (): Promise<IProductObject[]> => {
  const collection = await getCollection<IResponse>('products')
  const response = await collection.find().toArray()

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
