import Select, { OptionsType } from 'react-select'
import { Dispatch } from 'react'
import makeAnimated from 'react-select/animated'
import l from '../../language'
import s from './CustomSelector.module.scss'

import type { FilterOption } from '../../interfaces'
import { getOptionsFormatFromValue } from '../../helpers'

const allOptions = {
  size: [
    { value: '45', label: '45' },
    { value: '48', label: '48' },
    { value: '50', label: '50' },
    { value: '52', label: '52' },
    { value: '55', label: '55' },
  ],
  sort: [
    { value: 'popularity', label: l.popularity },
    { value: 'highPrice', label: l.highPrice },
    { value: 'lowPrice', label: l.lowPrice },
  ],
  material: [
    { value: 'cotton', label: l.cotton },
    { value: 'silk', label: l.silk },
  ],
  color: [
    { value: 'red', label: l.red },
    { value: 'blue', label: l.blue },
    { value: 'black', label: l.black },
  ],
  season: [
    { value: 'winter', label: l.winter },
    { value: 'summer', label: l.summer },
  ],
}

interface Props {
  type: string
  handleChange: (option: OptionsType<FilterOption>, type: string) => void
  value: string | string[]
  isMulti?: boolean
  label?: string
}

export default function CustomSelector({ type, handleChange, label = ' ', isMulti = false, value }: Props) {
  const animatedComponents = makeAnimated()

  return (
    <Select
      value={getOptionsFormatFromValue(value)}
      onChange={(option: OptionsType<FilterOption>) => handleChange(option, type)}
      placeholder={l[type]}
      label={label || l[type]}
      options={allOptions[type]}
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
