import axios from 'axios'
import { IProductObject } from '../../../../../interfaces'

export const addProduct = async newProduct =>
  axios
    .post<IProductObject>('https://projectbf-29lq.onrender.com/products', newProduct)
    .then(r => r.data as IProductObject)

export const updateProduct = async (id, newProduct) =>
  axios
    .patch<IProductObject>(`https://projectbf-29lq.onrender.com/products/${id}`, newProduct)
    .then(r => r.data as IProductObject)
// export const removeProduct = async id => productsSchemas.findByIdAndRemove({ _id: id })
// export const listProducts = async () => productsSchemas.find()
