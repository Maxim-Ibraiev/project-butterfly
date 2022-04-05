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

export const setShoppingBag = async (body: IShoppingBag, id: string = null): Promise<IShoppingBag> => {
  const collection = await getCollection<IResponse>('shopping-bags')
  const objectId = new ObjectId(id)
  const responseInsert = !id && (await collection.insertOne(body))

  if (id)
    await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: { selectedProducts: body.selectedProducts } }
    )

  const result = await getShoppingBagFromDB(responseInsert?.insertedId || id)

  Object.assign(result, { id: id || responseInsert.insertedId.toString() })

  return result
}
