import Select, { GroupTypeBase, OptionsType, Styles, defaultTheme, Props as selectProps } from 'react-select'
import { useReduceSelectors } from '../../customHook'
import { arrayWrapper, getOptionsFormatFromValue } from '../../helpers'
import { FilterOption, InitialFilter, IProduct } from '../../interfaces'
import l from '../../language'
import s from './CustomSelector.module.scss'

type IOptionsFromProduct = {
  [Property in keyof InitialFilter]: OptionsType<FilterOption>
}

const getOptionsFromProducts = (products: IProduct[]): IOptionsFromProduct => {
  const initialOptions: {
    size: string[]
    material: string[]
    color: string[]
    season: string[]
    category: string[]
  } = {
    size: [],
    material: [],
    color: [],
    season: [],
    category: [],
  }

  const allOptions = products.reduce((acc, product) => {
    acc.size.push(...product.getAllSizeOptions())
    acc.material.push(...product.getMaterial())
    acc.color.push(product.getColor())
    acc.season.push(product.getSeason())
    acc.category.push(product.getCategory())

    return acc
  }, initialOptions)

  const setOptions = {
    size: Array.from(new Set(allOptions.size)),
    material: Array.from(new Set(allOptions.material)),
    color: Array.from(new Set(allOptions.color)),
    season: Array.from(new Set(allOptions.season)),
    category: Array.from(new Set(allOptions.category)),
  }

  const getOptionFormat = (arr: string[]) => arr.map(el => ({ value: el, label: l[el] || el }))

  return {
    size: getOptionFormat(setOptions.size),
    material: getOptionFormat(setOptions.material),
    color: getOptionFormat(setOptions.color),
    season: getOptionFormat(setOptions.season),
    category: getOptionFormat(setOptions.category),
    sort: [
      { value: 'popularity', label: l.popularity },
      { value: 'highPrice', label: l.highPrice },
      { value: 'lowPrice', label: l.lowPrice },
    ],
  }
}

export type HandleChange = (type: keyof InitialFilter, optionValue: FilterOption['value'][]) => void

interface Props {
  type: keyof InitialFilter
  value: string | string[]
  handleChange: HandleChange
  menuPosition?: selectProps['menuPosition']
  isMulti?: boolean
}

const styles: Partial<Styles<FilterOption, boolean, GroupTypeBase<FilterOption>>> = {
  placeholder: pre => ({ ...pre, position: 'static', transform: 'none', width: 'auto', margin: 0 }),
  menu: pre => ({ ...pre, minWidth: 'max-content' }),
  multiValue: pre => ({ ...pre, marginLeft: 2, marginRight: 2 }),
  control: (pre, state) => ({
    ...pre,
    borderColor: state.hasValue ? 'black' : defaultTheme.colors.neutral20,
    maxHeight: '100%',
  }),
  singleValue: pre => ({ ...pre, position: 'static', transform: 'none', maxWidth: 'auto' }),
  valueContainer: (pre, state) => ({
    ...pre,
    paddingRight: state.hasValue && state.isMulti ? 0 : 8,
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    height: 30,
  }),
}

export default function CustomSelector({
  type,
  value,
  handleChange,
  menuPosition = 'absolute',
  isMulti = false,
}: Props) {
  const { products } = useReduceSelectors()
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
      components={{
        MultiValueContainer: () => ValueContainer({ text: l[type] || type }),
        SingleValue: () => ValueContainer({ text: l[arrayWrapper(value)[0]] || arrayWrapper(value) }),
      }}
      styles={styles}
      placeholder={l[type] || type}
      label={l[type] || type}
      options={allOptions[type]}
      inputId={l[type] || type}
      closeMenuOnSelect={!isMulti}
      isMulti={isMulti}
      isSearchable={false}
      hideSelectedOptions={false}
      className={s.selector}
      menuPosition={menuPosition}
    />
  )
}

function ValueContainer({ text }: { text: string }) {
  return <b className={s.multiValue}>{text}</b>
}
