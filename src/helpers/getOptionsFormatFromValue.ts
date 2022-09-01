import { DEFAULT_SORT_FOR_PRODUCTS } from '../constants'
import language from '../language'

export default function getOptionsFormatFromValue(valueOption: string | string[]) {
  if (!valueOption) return null

  return Array.isArray(valueOption)
    ? valueOption.map(element => ({
        value: element,
        label: language[element] || element,
      }))
    : [
        {
          value: valueOption || DEFAULT_SORT_FOR_PRODUCTS,
          label: language[valueOption] || valueOption,
        },
      ]
}
