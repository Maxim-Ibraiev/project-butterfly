import { IProduct } from '../interfaces'

interface IOptions {
  sort?: string
  size?: string | string[]
  material?: string | string[]
  color?: string | string[]
  season?: string | string[]
}

function getSortedProducts(products: IProduct[], sort?: string): IProduct[] {
  switch (sort) {
    case 'highPrice':
      return products.sort((a, b) => (a.price > b.price ? 1 : -1))

    case 'lowPrice':
      return products.sort((a, b) => (a.price > b.price ? -1 : 1))

    default:
      return products
  }
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
  const result = getSortedProducts(filteredProducts, options.sort)

  return result
}
