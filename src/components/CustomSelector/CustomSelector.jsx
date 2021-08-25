import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import l from '../../language/index.ts'
import s from './CustomSelector.module.scss'

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

export default function CustomSelector({ type = '', handleChange, isMulti = false, defaultValue }) {
  const animatedComponents = makeAnimated()
  const select = isMulti ? type : defaultValue.value

  return (
    <Select
      key={select}
      defaultValue={defaultValue}
      label={l[select]}
      inputId={l[select]}
      className={s.selector}
      placeholder={l[select]}
      options={allOptions[type]}
      isMulti={isMulti}
      isSearchable={false}
      onChange={handleChange}
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
      components={animatedComponents}
    />
  )
}
