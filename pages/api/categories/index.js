// import data from '../../../db.json'
import api from '../../../src/api'

export default async function categoriesHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      // const data = await api.getCategories()
      console.log('api')
      res.status(200).json({
        categories: ['dress', 'suit', 'jeans', 'shirt', 'largeSizes'],
        error: null,
      })
      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
