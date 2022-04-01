import { ObjectId } from 'mongodb'
import getCollection from '../../db/getCollection'
import { IShoppingBag } from '../../../../interfaces'

interface IResponse extends IShoppingBag {
  _id: ObjectId
}

export const getShoppingBagFromDB = async (id: string | ObjectId): Promise<IShoppingBag> => {
  const objectId = typeof id === 'string' ? new ObjectId(id) : id
  const collection = await getCollection<IResponse>('shopping-bags')
  const [result] = await collection.find({ _id: objectId }).toArray()

  return result
}

export const setShoppingBag = async (body: IShoppingBag): Promise<IShoppingBag> => {
  const collection = await getCollection<IResponse>('shopping-bags')
  const response = await collection.insertOne(body)
  const result = await getShoppingBagFromDB(response.insertedId)

  return result
}
