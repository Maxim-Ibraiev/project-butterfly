import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

const getCategories = async () => {
  try {
    const res = await axios.get('/categories')
    return { error: null, categories: res.data.data }
  } catch (error) {
    return {
      error: { data: error.response?.data || null, message: error.message },
      categories: null,
    }
  }
}

const getProducts = async () => {
  try {
    const res = await axios.get('products')
    return { error: null, products: res.data.data }
  } catch (error) {
    return {
      error: { data: error.response?.data || null, message: error.message },
      products: null,
    }
  }
}

export default { getCategories, getProducts }
