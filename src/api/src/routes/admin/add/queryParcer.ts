import { arrayWrapper } from '../../../../../helpers'
import { IProductToAdd } from '../../../../../interfaces'

export default function queryParser(query: string | string[]): IProductToAdd {
  if (Array.isArray(query)) throw new Error('Unexpected value of query. Expecting string.')

  const queryPrased = JSON.parse(query)

  return Object.entries(queryPrased).reduce((acc, [key, value]: [string, string[]]) => {
    if (key === 'material') acc[key] = arrayWrapper(value)
    else if (key === 'size') acc[key] = value.reduce((a, el) => Object.assign(a, { [el]: 1 }), {})
    else if (key === 'price') acc[key] = Number(value)
    else {
      // eslint-disable-next-line prefer-destructuring
      acc[key] = value[0]
    }

    return acc
  }, {})
}
