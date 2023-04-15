import { ProductStructure } from '../helpers'

export type Categories = string[]

export type IProduct = ProductStructure
export interface IProductObject {
  price: number
  popularity: number
  material: string[]
  color: string
  images: { original: string; thumbnail: string; color: string[] }[]
  globalCategory: string
  category: string
  description: string
  title: string
  model: string
  season: string
  size: {
    [key: string]: number
  }
  id: string
  createdAt: string
  updatedAt: string
  __v: number
  selectedSize?: null | number
}

export interface IProductToAdd {
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
  season?: string | string[]
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

export type ProductToAdd = {
  files: FileList
  title: string
  description: string
  category: string[]
  size: string[]
  material: string[]
  color: string[]
  season: string[]
}

export type ProductToUpdate = Omit<
  Partial<IProductObject>,
  'id' | 'createdAt' | 'updatedAt' | '__v' | 'selectedSize'
>
