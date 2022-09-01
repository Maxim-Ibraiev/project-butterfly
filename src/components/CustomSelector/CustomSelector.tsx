import { useSelector } from 'react-redux'
import Select, { OptionsType } from 'react-select'
import { arrayWrapper, getOptionsFormatFromValue } from '../../helpers'
import l from '../../language'
import { getProducts } from '../../redux/selectors'
import s from './CustomSelector.module.scss'
import { FilterOption, InitialFilter, IProduct } from '../../interfaces'

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

type HandleChange = (type: keyof InitialFilter, optionValue: FilterOption['value'][]) => void

interface Props {
  type: keyof InitialFilter
  value: string | string[]
  handleChange: HandleChange
  isMulti?: boolean
}

export default function CustomSelector({ type, value, handleChange, isMulti = false }: Props) {
  const products = useSelector(getProducts)
  const allOptions = getOptionsFromProducts(products)

  return (
    <Select
      value={getOptionsFormatFromValue(value)}
      onChange={(option: FilterOption & OptionsType<FilterOption>) => {
        handleChange(
          type,
          arrayWrapper(option).map(el => el.value)
        )
      }}
      placeholder={l[type] || type}
      label={l[type] || type}
      options={allOptions[type]}
      inputId={l[type] || type}
      closeMenuOnSelect={!isMulti}
      isMulti={isMulti}
      key={type}
      isSearchable={false}
      hideSelectedOptions={false}
      className={s.selector}
    />
  )
}
