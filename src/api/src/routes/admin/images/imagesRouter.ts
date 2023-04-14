import { updateImages, updateAdd } from './imagesControler'
import Responser from '../../Responser'

export default async function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
      await updateImages(req, res)
      break
    case 'POST':
      await updateAdd(req, res)
      break

    default:
      {
        const response = Responser.getMethodNotAllowed(req.method)

        res.status(response.status).json(response)
      }
      break
  }
}
