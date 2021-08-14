// // import data from '../../../db.json'
// // import api from '../../../src/api'

export default async function categoriesHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      // const data = await api.getCategories()
      res.status(200).json({
        data: ['dress', 'suit', 'jeans', 'shirt', 'largeSizes'],
        error: null,
      })
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
