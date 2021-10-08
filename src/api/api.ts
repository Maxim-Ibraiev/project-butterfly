import axios from 'axios'
import { Categories, IProductObject } from '../interfaces'

axios.defaults.baseURL = 'https://product-bf.herokuapp.com'

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
