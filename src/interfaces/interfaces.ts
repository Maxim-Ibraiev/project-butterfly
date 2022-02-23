import { ProductStructure } from '../helpers'

export type Categories = string[]

export type IProduct = ProductStructure
export interface IProductObject {
  price: number
  popularity: number
  material: string[]
  color: string
  images: { original: string; thumbnail: string; color: string[] }[]
  id: string
  category: string
  description: string
  title: string
  model: string
  season: string
  createdAt: string
  updatedAt: string
  __v: number
  size: {
    [key: string]: number
  }
  selectedSize?: null | number
}

export type ISelectedProductsFromStorage = {
  selectedSize?: IProductObject['selectedSize']
  id: string
}[]

export interface IDataResponse {
  error: Error | null
  categories?: Categories
  products?: IProduct
}

export interface IState {
  main: {
    categories: Categories
    products: IProductObject[]
    selectedProducts: IProductObject[]
    error: IError
  }
}

export interface IError {
  data: null | string | unknown
  message: string
}

export interface IResponse<T> {
  status: number
  data: T | null
  error: {
    data: unknown
    message: string
  } | null
}

export type FilterOption = { value: string; label: string }

export type InitialFilter = {
  category?: string
  size?: string | string[]
  material?: string | string[]
  color?: string | string[]
  season?: string | string[]
  sort?: string
}

export type Request = 'Error' | 'Request' | 'Success' | undefined | null
