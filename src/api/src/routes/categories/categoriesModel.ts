/* eslint-disable no-underscore-dangle */
import connectToDatabase from '../../db/connectToDatabase'

type IResponse = {
  category: string
  _id: unknown
}

export const listCategories = async () => {
  const { db } = await connectToDatabase()
  const response = await db.collection<IResponse>('categories').find().toArray()

  return response
}
