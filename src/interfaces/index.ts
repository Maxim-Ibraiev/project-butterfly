export type { ICategoriesProps, IProductsProps } from './props'

export type Categories = string[]

export interface IProduct {
  material: string[]
  _id: string
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
