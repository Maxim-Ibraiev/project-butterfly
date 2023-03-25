import axios from 'axios'
import { IProductObject } from '../../../../../interfaces'
import productsSchemas from '../../../db/schemas/productsSchemas'

export const listProducts = async () => productsSchemas.find()

export const addProduct = async newProduct =>
  axios
    .post<IProductObject>('https://projectbf-29lq.onrender.com/products', newProduct)
    .then(r => r.data as IProductObject)

export const removeProduct = async id => productsSchemas.findByIdAndRemove({ _id: id })

export const updateProduct = async (id, body) =>
  productsSchemas.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  })
