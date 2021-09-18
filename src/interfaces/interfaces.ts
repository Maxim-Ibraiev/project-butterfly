export type Categories = string[]

export interface IProduct {
  price: number
  popularity: number
  material: string[]
  color: string
  images: { original: string; thumbnail: string; color: string[] }[]
  id: string
  category: string
  description: string
  title: string
  createdAt: string
  updatedAt: string
  __v: number
  size: {
    [key: string]: number
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

export type Request = 'Error' | 'Request' | 'Success' | undefined | null
