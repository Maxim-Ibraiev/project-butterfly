import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

const getCategories = async () => {
  try {
    const res = await axios.get('/categories').catch(console.log)
    return res.data.data
  } catch (error) {
    return error
  }
}

export default { getCategories }
