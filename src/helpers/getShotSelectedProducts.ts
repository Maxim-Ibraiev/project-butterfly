import { IProduct, IShotSelectedProducts } from '../interfaces'

export default (products: IProduct[]): IShotSelectedProducts =>
  products.map(el => ({ id: el.getId(), selectedSize: el.getSelectedSize() }))
