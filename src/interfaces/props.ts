import { Categories, IProductObject } from '.'

export interface IProductsProps {
  products: IProductObject[] | null
  productsError: {
    data: unknown
    message: string
  }
}
export interface ICategoriesProps {
  categories: Categories | null
  categoriesError: {
    data: unknown
    message: string
  }
}
