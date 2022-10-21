import ProductStructure from './ProductStructure'
import { IProduct } from '../interfaces'

class HendlerError {
  static #baseError(message: string) {
    if (process.env.NODE_ENV === 'development') throw new Error(message)
    console.error(message)
  }

  static productType(products: IProduct[] | readonly IProduct[]) {
    const isInstance = products.every(el => el instanceof ProductStructure)

    if (!isInstance)
      this.#baseError(`Expected instanceof ProductStructure but got ${JSON.stringify(products)}.`)
  }
}

export default HendlerError
