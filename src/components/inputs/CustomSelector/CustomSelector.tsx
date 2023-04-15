import { UseFormRegister, FieldValues } from 'react-hook-form'
import Select, { OptionsType, Props } from 'react-select'
import CreatableSelector from 'react-select/creatable'
import styles from './selectStyles'
import { useReduceSelectors } from '../../../customHook'
import { arrayWrapper, getOptionsFormatFromValue, getOptionsFromProducts } from '../../../helpers'
import { getOptionFormat } from '../../../helpers/getOptionsFromProducts'
import { FilterOption, InitialFilter } from '../../../interfaces'
import l from '../../../language'
import s from './CustomSelector.module.scss'

export type OnChange = (type: keyof InitialFilter, optionValue: FilterOption['value'][]) => void

export interface ISelect {
  type: keyof InitialFilter
  value: string | string[]
  onChange: OnChange
  options?: string[]
  menuPosition?: Props['menuPosition']
  isMulti?: boolean
  isCreatableSelector?: boolean
  isSeaSelectedOptions?: boolean
  required?: boolean
  register?: UseFormRegister<FieldValues>
}

export default function CustomSelector({
  type,
  value,
  onChange,
  options,
  menuPosition = 'absolute',
  isMulti = false,
  isCreatableSelector = false,
  isSeaSelectedOptions = false,
  required = false,
  register = null,
}: ISelect) {
  const { products } = useReduceSelectors()
  const allOptions = (options && { [type]: getOptionFormat(options) }) || getOptionsFromProducts(products)
  const regOption = register && {
    ...register(type, {
      required,
      // onChange: (option: FilterOption & OptionsType<FilterOption>) =>
      //   onChange(type, option ? arrayWrapper(option).map(el => el.value) : []),
    }),
  }

  const props = {
    value: getOptionsFormatFromValue(value),
    components: !isSeaSelectedOptions && {
      MultiValueContainer: () => ValueContainer({ text: l[type] || type }),
      SingleValue: () => ValueContainer({ text: l[arrayWrapper(value)[0]] || arrayWrapper(value) }),
    },
    styles,
    placeholder: l[type] || type,
    label: l[type] || type,
    options: allOptions[type],
    inputId: l[type] || type,
    closeMenuOnSelect: !isMulti,
    isMulti,
    isSearchable: false,
    hideSelectedOptions: false,
    className: s.selector,
    menuPosition,
  } as Props

  if (regOption) {
    Object.assign(props, regOption)
  }
  props.onChange = (option: FilterOption & OptionsType<FilterOption>) => {
    const incomingValue = option ? arrayWrapper(option).map(el => el.value) : []
    onChange(type, incomingValue)

    if (regOption) {
      regOption.onChange({
        target: { value: incomingValue, name: type },
        type,
      })
    }
  }

  return isCreatableSelector ? (
    <CreatableSelector {...props} isClearable isSearchable />
  ) : (
    <Select {...props} />
  )
}

function ValueContainer({ text }: { text: string }) {
  return <b className={s.multiValue}>{text}</b>
}
