import ProductStructure from './ProductStructure'

import { IProduct } from '../interfaces'

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */

class HendlerError {
  stringTupe: (entity: { [key: string]: unknown }) => void

  static #baseError(message: string) {
    if (process.env.NODE_ENV === 'development') throw new Error(message)
    console.error(message)
  }

  static stringType(entity: { [key: string]: string }) {
    Object.entries(entity).forEach(([key, value]) => {
      if (typeof value !== 'string') this.#baseError(`${key} have to be string but get: ${value}`)
    })
  }

  static arrOfStringsType(entites: { [key: string]: string[] }) {
    Object.entries(entites).forEach(([key, value]) => {
      if (!Array.isArray(value)) this.#baseError(`${key} have to be Array but get: ${typeof value}`)

      value.forEach(
        el =>
          typeof el !== 'string' &&
          this.#baseError(`Each element in ${key} have to be the string but get: ${typeof el}`)
      )
    })
  }

  static arrayType(arr) {
    if (!Array.isArray(arr)) this.#baseError(`Expected array but got ${typeof arr}`)
  }

  static productType(products: IProduct[] | readonly IProduct[]) {
    this.arrayType(products)

    const isInstance = products.map(el => el instanceof ProductStructure).every(el => el)

    if (!isInstance)
      this.#baseError(`Expected instanceof ProductStructure but got ${JSON.stringify(products)}.`)
  }
}

export default HendlerError