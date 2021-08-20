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

// interface a { main?: { categories?: string[]; products?: {}[]; error?: { ...; }; }; }

// // The types of 'main.error' are incompatible between these types.
//     Type '{}' is missing the following properties from type '{ data: {}; message: string; }': data, message
