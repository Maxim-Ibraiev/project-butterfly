import connectToDatabase from '../../db/connectToDatabase'

export const listCategories = async (): Promise<{ category: string }[]> => {
  const { db } = await connectToDatabase()

  return db.collection('categories').find().toArray()
}
