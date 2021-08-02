interface IOptions {
  sort: string
  size?: string | string[]
  material?: string | string[]
  color?: string | string[]
  season?: string | string[]
}

interface IProduct {
  price: number
}

type Products = IProduct[]

function getSortedProducts(products: Products, sort: string) {
  if (sort === 'highPrice') products.sort((a, b) => (a.price > b.price ? 1 : -1))
  if (sort === 'lowPrice') products.sort((a, b) => (a.price > b.price ? -1 : 1))

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

export default function getFilteredProducts(products: Products, options: IOptions): Products {
  if (!products) {
    throw new Error(`Product is ${products}. The Products are expected to be an array`)
  }

  const filteredProducts = products.filter(el => filterForProducts(el, options))
  const result: Products = getSortedProducts(filteredProducts, options.sort)

  return result
}
