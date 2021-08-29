export type Categories = string[]

export interface IProduct {
  material: string[]
  id: string
  description: string
  title: string
  price: number
  alert: string
  createdAt: string
  updatedAt: string
  __v: number
  size: {
    [key: number]: number
  }
}

export interface IDataResponse {
  error: Error | null
  categories?: Categories
  products?: IProduct
}

export interface IState {
  main: {
    categories: Categories
    products: IProduct[]
    error: IError
  }
}

export interface IError {
  data: null | string | unknown
  message: string
}

export type FilterOption = { value: string; label: string }

export type InitialFilter = {
  category?: string
  size?: string | string[]
  material?: string | string[]
  color?: string | string[]
  season?: string | string[]
  sort?: string | string[]
}
