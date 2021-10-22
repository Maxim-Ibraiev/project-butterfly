import { IProduct } from '../interfaces'

interface IOptions {
  [key: string]: string | string[]
}

const arrayWrapper = <T = string>(arg: T | T[]): T[] => (Array.isArray(arg) ? arg : [arg])

function getSortedProducts(products: IProduct[], sort?: string | string[]): IProduct[] {
  const sortArr = arrayWrapper(sort)

  sortArr.forEach(sortOption => {
    switch (sortOption) {
      case 'highPrice':
        products.sort((a, b) => (a.getPrice() > b.getPrice() ? 1 : -1))
        break

      case 'lowPrice':
        products.sort((a, b) => (a.getPrice() > b.getPrice() ? -1 : 1))
        break

      case 'popularity':
        products.sort((a, b) => (a.getPopularity() > b.getPopularity() ? -1 : 1))
        break

      default:
        products.sort((a, b) => (a.getPopularity() > b.getPopularity() ? -1 : 1))
        break
    }
  })

  return products
}

const isSizeMatchedProduct = (product: IProduct, option: string | string[]): boolean => {
  const optionsArr = arrayWrapper(option)
  return optionsArr.some(sizeOption => {
    if (!sizeOption) return true

    const productSize = product.getAllSizeOptions()

    return productSize.includes(sizeOption)
  })
}

function isMatchedProduct(product: IProduct, options: IOptions): boolean {
  const specialOptions = ['sort', 'size']
  const optionsKeys = Object.keys(options)
  const filteredOptions = optionsKeys.filter(element => !specialOptions.some(el => el === element))

  return filteredOptions.every(currentOption => {
    const fnName = `get${currentOption.slice(0, 1).toUpperCase()}${currentOption.slice(1)}`
    const currentOptionsOfProduct = arrayWrapper(product[fnName]())
    const currentOptions = arrayWrapper(options[currentOption])

    return currentOptions.some(optionOfProduct =>
      currentOptionsOfProduct.some(value => value === optionOfProduct)
    )
  })
}

function filterForProducts(products: IProduct[], options?: IOptions): IProduct[] {
  return products.filter(
    product => isMatchedProduct(product, options) && isSizeMatchedProduct(product, options.size)
  )
}

export default function getFilteredProducts(products: readonly IProduct[], options?: IOptions): IProduct[] {
  if (!products) {
    throw new Error(`Product is ${products}. The Products are expected to be an array`)
  }

  let filteredProducts = [...products]
  filteredProducts = filterForProducts(filteredProducts, options)

  return getSortedProducts(filteredProducts, options.sort)
}
