import { IProduct } from '../interfaces'

interface IOptions {
  [key: string]: string | string[]
}

function wrapperArr<T>(arg: T | T[]): T[] {
  return Array.isArray(arg) ? arg : [arg]
}

function getSortedProducts(products: IProduct[], sort?: string | string[]): IProduct[] {
  const sortArr = wrapperArr<string>(sort)

  sortArr.forEach(sortOption => {
    switch (sortOption) {
      case 'highPrice':
        products.sort((a, b) => (a.price > b.price ? 1 : -1))
        break

      case 'lowPrice':
        products.sort((a, b) => (a.price > b.price ? -1 : 1))
        break

      case 'popularity':
        products.sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
        break

      default:
        products.sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
        break
    }
  })

  return products
}

function getArrayFormat(param: string | string[]): string[] {
  if (Array.isArray(param)) {
    return param
  }

  return [param]
}

function filterForProducts(product: IProduct, options: IOptions) {
  const specialOptions = ['sort', 'size']
  const optionsKeys = Object.keys(options)
  const filteredOptions = optionsKeys.filter(element => !specialOptions.some(el => el === element))

  return filteredOptions.every(currentOption => {
    const currentOptionsOfProduct = getArrayFormat(product[currentOption])
    const currentOptions = getArrayFormat(options[currentOption])

    return currentOptions.every(optionOfProduct =>
      currentOptionsOfProduct.some(value => value === optionOfProduct)
    )
  })
}

export default function getFilteredProducts(products: IProduct[], options?: IOptions): IProduct[] {
  if (!products) {
    throw new Error(`Product is ${products}. The Products are expected to be an array`)
  }

  const filteredProducts = products.filter(el => filterForProducts(el, options))

  return getSortedProducts(filteredProducts, options.sort)
}
