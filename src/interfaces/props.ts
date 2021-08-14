import { Categories, IProduct } from '.'

export interface IProductsProps {
  products: IProduct[]
  productsError: {
    data: unknown
    message: string
  }
}
export interface ICategoriesProps {
  categories: Categories
  categoriesError: {
    data: unknown
    message: string
  }
}
