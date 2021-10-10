import { NextApiRequest, NextApiResponse } from 'next'
import { listCategories } from './categoriesModel'

export const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await listCategories()
    const categoriesToFlatArr = categories.map(el => el.category)
    res.status(200).json({ data: categoriesToFlatArr })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

// export const createCategory = async (req, res) => {
//   try {
//     const newCategory = await addCategory(req.body)

//     res.status(200).json({ data: newCategory })
//   } catch (e) {
//     res.status(400).json({ error: e.message })
//   }
// }

// export const deleteCategory = async (req, res) => {
//   try {
//     const deletedCategory = await removeCategory(req.body.id)

//     res.status(200).json({ data: deletedCategory })
//   } catch (e) {
//     res.status(404).json({ message: e.message })
//   }
// }
