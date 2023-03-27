import formidable, { Options } from 'formidable'
import { NextApiHandler, NextApiRequest } from 'next'
import { addProduct } from './addModel'
import { arrayWrapper } from '../../../../../helpers'
import { IProductObject, IResponse } from '../../../../../interfaces'
import RequestValidator from '../../RequestValidator'
import Responser from '../../Responser'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface IProductToAdd {
  price?: number
  popularity?: number
  material?: string[]
  color?: string
  images?: { original: string; thumbnail: string; color: string[] }[]
  globalCategory?: string
  category?: string
  description?: string
  title?: string
  model?: string
  season?: string
  size?: {
    [key: string]: number
  }
}

const dirName = `${process.cwd()}/images`

type FileReader = (
  req: NextApiRequest,
  saveLocally?: boolean
) => Promise<{ fields: formidable.Fields; files: formidable.Files }>

const fileReader: FileReader = req => {
  const options: Options = { maxFileSize: 4000 * 1024 * 1024, multiples: true }

  const form = formidable(options)

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)

      resolve({ fields, files })
    })
  })
}

const createProduct: NextApiHandler = async (req, res) => {
  let response: IResponse<IProductObject> = null
  // todo add gorder for admin
  try {
    const { files, fields } = await fileReader(req)

    const query = queryParser(fields.data)
    const product: IProductToAdd = {
      popularity: 0,
      ...query,
      images: imageParser(files, query.color),
    }
    // const fileError = RequestValidator.fileList(files).error
    const productError = RequestValidator.product(product).error

    console.log('query:', query)

    // if (fileError) response = Responser.getBadRequest(fileError)
    if (productError) response = Responser.getBadRequest(productError)
    if (response) res.status(response.status).json(response)
    if (response) return

    console.log('response error:', response)

    // add products
    try {
      const productResponse = await addProduct(product)
      console.log('productResponse:', productResponse)
      response = Responser.getOK(null)
      // response = Responser.getOK(productResponse)
    } catch (error) {
      response = Responser.getServerError(error)
      console.log(error)

      console.error('product post error')
    }

    res.status(response.status).json(response)
  } catch (error) {
    response = Responser.getServerError(error)
    res.status(response.status).json(response)
  }
}

function imageParser(files: formidable.Files, color: string): IProductToAdd['images'] {
  return arrayWrapper(files.myImage).map(el => ({
    original: el.newFilename,
    thumbnail: el.newFilename,
    color: [color],
  }))
}

function queryParser(query: string | string[]): IProductToAdd {
  if (Array.isArray(query)) throw new Error('Unexpected value of query. Expecting string.')

  const queryPrased = JSON.parse(query)

  return Object.entries(queryPrased).reduce((acc, [key, value]: [string, string[]]) => {
    if (key === 'material') acc[key] = arrayWrapper(value)
    else if (key === 'size') acc[key] = value.reduce((a, el) => Object.assign(a, { [el]: 1 }), {})
    else if (key === 'price') acc[key] = Number(value)
    else {
      // eslint-disable-next-line prefer-destructuring
      acc[key] = value[0]
    }

    return acc
  }, {})
}

export default { createProduct }
