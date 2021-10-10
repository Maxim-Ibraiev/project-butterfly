import connectToDatabase from '../../db/connectToDatabase'

type T = { [key: string]: string }
export const listCategories = async (): Promise<T[]> => {
  const { models } = await connectToDatabase()
  const categories: T[] = models.categories.find()

  return categories
}

// export const addCategory = async newCategory => {
//   await connectToDatabase()

//   return categories.create(newCategory)
// }

// export const removeCategory = async categoryId => {
//   await connectToDatabase()

//   return categories.findByIdAndRemove({ _id: categoryId })
// }
