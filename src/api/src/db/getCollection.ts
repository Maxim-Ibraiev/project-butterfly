import { Document } from 'mongodb'
import connectToDatabase from './connectToDatabase'

type CollectionList = 'categories' | 'products' | 'shopping-bags'

export default async function getCollection<T = Document>(collectionName: CollectionList) {
  const { db } = await connectToDatabase()

  return db.collection<T>(collectionName)
}
