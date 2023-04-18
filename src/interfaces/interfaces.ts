import { ProductStructure } from '../helpers'

export type Categories = string[]

export type IProduct = ProductStructure
export interface IProductObject {
  price: number
  popularity: number
  material: string[]
  colors: string[]
  images: { original: string; thumbnail: string; color: string[] }[]
  globalCategory: string
  category: string
  description: string
  title: string
  model: string
  sizes: string[]
  id: string
  createdAt: string
  updatedAt: string
  __v: number
  selectedSize?: null | string
}

export interface IShoppingBag {
  id: string
  selectedProducts: IShotSelectedProducts
}

export type IShotSelectedProducts = {
  selectedSize?: IProductObject['selectedSize']
  id: string
}[]

export interface ICallRequest {
  name: string
  phoneNumber: string
}

export interface IDataResponse {
  error: Error | null
  categories?: Categories
  products?: IProduct
}

export interface IState {
  main: {
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
  error: IError | null
}

export type FilterOption = { value: string; label: string }

export type InitialFilter = {
  globalCategory?: string | string[]
  model?: string | string[]
  category?: string | string[]
  size?: string | string[]
  material?: string | string[]
  color?: string | string[]
  sort?: string | string[]
}

export type FilterQuery = {
  [Property in keyof InitialFilter]: string[]
}

export type Request = 'Error' | 'Request' | 'Success' | undefined | null

export interface ILoginData {
  login: string
  password: string
}

export interface IAdmin {
  name: string
  auth: boolean
}

type UnlistedDataForBackEnd = 'id' | 'createdAt' | 'updatedAt' | '__v' | 'selectedSize'

export type ProductToAdd = Omit<IProductObject, UnlistedDataForBackEnd | 'popularity'>

export type ProductToUpdate = Omit<Partial<IProductObject>, UnlistedDataForBackEnd>
