import { useSelector } from 'react-redux'
import Select, { OptionsType } from 'react-select'
import makeAnimated from 'react-select/animated'
import { getOptionsFormatFromValue } from '../../helpers'
import type { FilterOption, IProduct } from '../../interfaces'
import l from '../../language'
import { getProducts } from '../../redux/selectors'
import s from './CustomSelector.module.scss'

// const allOptions = {
//   size: [
//     { value: '45', label: '45' },
//     { value: '48', label: '48' },
//     { value: '50', label: '50' },
//     { value: '52', label: '52' },
//     { value: '55', label: '55' },
//   ],
//   sort: [
//     { value: 'popularity', label: l.popularity },
//     { value: 'highPrice', label: l.highPrice },
//     { value: 'lowPrice', label: l.lowPrice },
//   ],
//   material: [
//     { value: 'cotton', label: l.cotton },
//     { value: 'silk', label: l.silk },
//   ],
//   color: [
//     { value: 'red', label: l.red },
//     { value: 'blue', label: l.blue },
//     { value: 'black', label: l.black },
//   ],
//   season: [
//     { value: 'winter', label: l.winter },
//     { value: 'summer', label: l.summer },
//   ],
// }

const getOptionsFromProducts = (products: IProduct[]) => {
  const initialOptions: { size: string[]; material: string[]; color: string[]; season: string[] } = {
    size: [],
    material: [],
    color: [],
    season: [],
  }

  const allOptions = products.reduce((acc, product) => {
    acc.size.push(...product.getAllSizeOptions())
    acc.material.push(...product.getMaterial())
    acc.color.push(product.getColor())
    acc.season.push(product.getSeason())

    return acc
  }, initialOptions)

  const setOptions = {
    size: Array.from(new Set(allOptions.size)),
    material: Array.from(new Set(allOptions.material)),
    color: Array.from(new Set(allOptions.color)),
    season: Array.from(new Set(allOptions.season)),
  }

  const getOptionFormat = (arr: string[]) => arr.map(el => ({ value: el, label: l[el] || el }))

  return {
    size: getOptionFormat(setOptions.size),
    material: getOptionFormat(setOptions.material),
    color: getOptionFormat(setOptions.color),
    season: getOptionFormat(setOptions.season),
    sort: [
      { value: 'popularity', label: l.popularity },
      { value: 'highPrice', label: l.highPrice },
      { value: 'lowPrice', label: l.lowPrice },
    ],
  }
}

interface Props {
  type: string
  handleChange: (option: OptionsType<FilterOption>, type: string) => void
  value: string | string[]
  isMulti?: boolean
  label?: string
  options?: FilterOption[]
}

export default function CustomSelector({
  type,
  handleChange,
  options,
  label = '',
  isMulti = false,
  value,
}: Props) {
  const products = useSelector(getProducts)
  const animatedComponents = makeAnimated()
  const allOptions = getOptionsFromProducts(products)

  return (
    <Select
      value={getOptionsFormatFromValue(value)}
      onChange={(option: OptionsType<FilterOption>) => handleChange(option, type)}
      placeholder={label || l[type]}
      label={label || l[type]}
      options={options || allOptions[type]}
      inputId={label || l[type]}
      closeMenuOnSelect={!isMulti}
      isMulti={isMulti}
      key={type}
      isSearchable={false}
      hideSelectedOptions={false}
      components={animatedComponents}
      className={s.selector}
    />
  )
}
