import arrayWrapper from './arrayWrapper'
import { SHOPPING_ID } from '../constants'
import { IProduct } from '../interfaces'

interface IOptions {
  [key: string]: string | string[]
}

export default function getFilteredProducts(products: readonly IProduct[], options?: IOptions): IProduct[] {
  OptionChecker(options)

  let filteredProducts = [...products]
  filteredProducts = filterForProducts(filteredProducts, options)

  return getSortedProducts(filteredProducts, options.sort)
}

function OptionChecker(options?: IOptions) {
  const supportedOptions = [
    'sort',
    'category',
    'color',
    'material',
    'season',
    'size',
    'category',
    SHOPPING_ID,
  ]

  Object.keys(options).forEach(option => {
    if (!supportedOptions.includes(option)) console.warn(`Option '${option}' do not support for sorting.`)
  })
}

function filterForProducts(products: IProduct[], options?: IOptions): IProduct[] {
  return products.filter(
    product => isMatchedProduct(product, options) && isSizeMatchedProduct(product, options.size)
  )
}

type MatchedOption = {
  category?: string[]
  size?: string[]
  material?: string[]
  color?: string[]
  season?: string[]
  sort?: string[]
}

function isMatchedProduct(product: IProduct, options: MatchedOption) {
  const result = [
    isOptionMatch(product.getCategory(), options.category),
    isOptionMatch(product.getColor(), options.color),
    isOptionMatch(product.getMaterial(), options.material),
    isOptionMatch(product.getSeason(), options.season),
  ]

  return result.every(el => el)
}

function isOptionMatch(
  productValue: string | string[],
  optionValue: string | string[],
  option: { isAllMatchsRequaire?: boolean } = {}
) {
  const arrProductValue = arrayWrapper(productValue)
  const arrOptionValue = arrayWrapper(optionValue)

  if (!optionValue) return true
  if (!productValue) return false

  return option.isAllMatchsRequaire
    ? arrOptionValue.every(el => arrProductValue.some(prd => prd === el))
    : arrOptionValue.some(el => arrProductValue.some(prd => prd === el))
}

const isSizeMatchedProduct = (product: IProduct, option: string | string[]): boolean => {
  const optionsArr = arrayWrapper(option)

  if (optionsArr.length === 0) return true

  return optionsArr.some(sizeOption => {
    const productSize = product.getAllSizeOptions()

    return productSize.includes(sizeOption)
  })
}

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
