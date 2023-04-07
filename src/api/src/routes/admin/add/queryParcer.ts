import { arrayWrapper } from '../../../../../helpers'
import { ProductReceivingForUpdate } from '../../../../../interfaces'

export default function queryParser(query: string | string[]): ProductReceivingForUpdate {
  const arrQuery = arrayWrapper(query)

  if (arrQuery.length > 1) throw new Error('Unexpected value of query. Expecting single value.')

  const queryPrased = JSON.parse(arrQuery[0])

  return Object.entries(queryPrased).reduce((acc, [key, value]: [string, string[]]) => {
    if (key === 'material') acc[key] = arrayWrapper(value)
    else if (key === 'size') acc[key] = value.reduce((a, el) => Object.assign(a, { [el]: 1 }), {})
    else if (key === 'price') acc[key] = Number(value)
    else {
      // eslint-disable-next-line prefer-destructuring
      acc[key] = arrayWrapper(value)[0]
    }

    return acc
  }, {} as ProductReceivingForUpdate)
}
