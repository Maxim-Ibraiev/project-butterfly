import { Document } from 'mongodb'
import connectToDatabase from './connectToDatabase'

export default async function getCollection<T = Document>(CollectionName: string) {
  const { db } = await connectToDatabase()

  return db.collection<T>(CollectionName)
}
