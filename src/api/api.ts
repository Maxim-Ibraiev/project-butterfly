import os from 'os'
import axios from 'axios'
import { Categories, IProductObject } from '../interfaces'

const nets = os.networkInterfaces()
let ip = ''

Object.keys(nets).forEach(name => {
  nets[name].forEach(net => {
    if (net.family === 'IPv4' && !net.internal) ip = net.address
  })
})

axios.defaults.baseURL = `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${ip}:${
  process.env.PORT || 3000
}/api`

interface IGetProducts {
  error: null | {
    data: unknown | string | null
    message: string
  }
  products: IProductObject[] | null
}

interface IGetCategories {
  error: null | {
    data: unknown | string | null
    message: string
  }
  categories: Categories | null
}

const getCategories = async (): Promise<IGetCategories> => {
  try {
    const res = await axios.get('/categories')

    return { error: null, categories: res.data.data }
  } catch (error) {
    return {
      error: {
        data: (error.response && error.response.data) || JSON.stringify(error) || true,
        message: error.message,
      },
      categories: null,
    }
  }
}

const getProducts = async (): Promise<IGetProducts> => {
  try {
    const res = await axios.get('/products')

    return { error: null, products: res.data.data }
  } catch (error) {
    return {
      error: {
        data: (error.response && error.response.data) || JSON.stringify(error) || true,
        message: error.message,
      },
      products: null,
    }
  }
}

export default { getCategories, getProducts }
