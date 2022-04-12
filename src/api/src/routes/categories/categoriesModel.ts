/* eslint-disable no-underscore-dangle */
import getCollection from '../../db/getCollection'

export const listCategories = async () => {
  const collection = await getCollection('categories')
  const response = collection.find().toArray()

  return response
}
