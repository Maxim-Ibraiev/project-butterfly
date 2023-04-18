import { OptionsType } from 'react-select'
import { FilterOption, InitialFilter, IProduct } from '../interfaces'
import l from '../language'

type IOptionsFromProduct = {
  [Property in keyof InitialFilter]: OptionsType<FilterOption>
}

export const getOptionFormat = (arr: string[]) => arr.map(el => ({ value: el, label: l[el] || el }))

const getOptionsFromProducts = (products: IProduct[]): IOptionsFromProduct => {
  const initialOptions: {
    sizes: string[]
    material: string[]
    colors: string[]
    category: string[]
    model: string[]
  } = {
    sizes: [],
    material: [],
    colors: [],
    category: [],
    model: [],
  }

  const allOptions = products.reduce((acc, product) => {
    acc.sizes.push(...product.getAllSizeOptions())
    acc.material.push(...product.getMaterial())
    acc.category.push(product.getCategory())
    acc.model.push(product.getModel())

    return acc
  }, initialOptions)

  const setOptions = {
    size: Array.from(new Set(allOptions.sizes)),
    material: Array.from(new Set(allOptions.material)),
    color: Array.from(new Set(allOptions.colors)),
    category: Array.from(new Set(allOptions.category)),
    model: Array.from(new Set(allOptions.model)),
  }

  return {
    size: getOptionFormat(setOptions.size),
    material: getOptionFormat(setOptions.material),
    color: getOptionFormat(setOptions.color),
    category: getOptionFormat(setOptions.category),
    model: getOptionFormat(setOptions.model),
    sort: [
      { value: 'popularity', label: l.popularity },
      { value: 'highPrice', label: l.highPrice },
      { value: 'lowPrice', label: l.lowPrice },
    ],
  }
}

export default getOptionsFromProducts
