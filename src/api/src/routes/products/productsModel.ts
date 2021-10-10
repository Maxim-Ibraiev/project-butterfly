import products from '../../db/schemas/productsSchemas'
import connectToDatabase from '../../db/connectToDatabase'

export const listProducts = async () => {
  const { models } = await connectToDatabase()

  return models.products.find()
}

// export const addProduct = async newContact => products.create(newContact)

// export const removeProduct = async id => products.findByIdAndRemove({ _id: id })

// export const updateProduct = async (id, body) =>
//   products.findByIdAndUpdate({ _id: id }, body, {
//     new: true,
//   })
