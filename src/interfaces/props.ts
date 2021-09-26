import { Categories, IProduct } from '.'

export interface IProductsProps {
  products: IProduct[] | null
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
