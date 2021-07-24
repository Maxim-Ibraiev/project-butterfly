export default function getFilteredProducts(products = [], options) {
  const optionsValues = Object.values(options)
  const optionsKeys = Object.keys(options)
  const multiOptions = []
  const sortOptions = []

  optionsValues.forEach((el, ind) =>
    Array.isArray(el)
      ? multiOptions.push(optionsKeys[ind])
      : sortOptions.push(optionsKeys[ind])
  )

  // filter
  const filterForProducts = product =>
    multiOptions.every(option => {
      if (Array.isArray(product[option]) && product[option].length !== 0) {
        return product[option].every(optionOfProduct =>
          options[option].length !== 0
            ? options[option].some(({ value }) => value === optionOfProduct)
            : true
        )
      }

      return true
    })

  const filteredProducts = products.filter(filterForProducts)

  // sort
  if (options.sort.value === 'highPrice')
    filteredProducts.sort((a, b) => b.price - a.price)
  if (options.sort.value === 'lowPrice')
    filteredProducts.sort((a, b) => a.price - b.price)

  return filteredProducts
}
