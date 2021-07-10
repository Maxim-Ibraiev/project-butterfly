import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import l from '../../language'
import s from './Filter.module.scss'

const handleOption = e => {
  // console.log(e)
}

const size = [
  { value: 45, label: 45 },
  { value: 48, label: 48 },
  { value: 50, label: 50 },
  { value: 52, label: 52 },
  { value: 55, label: 55 },
]

const popularity = [
  { value: 'popularity', label: l.popularity },
  { value: 'highPrice', label: l.highPrice },
  { value: 'lowPrice', label: l.lowPrice },
]
const material = [
  { value: 'cotton', label: l.cotton },
  { value: 'silk', label: l.silk },
]
const color = [
  { value: 'red', label: l.red },
  { value: 'blue', label: l.blue },
]
const season = [
  { value: 'winter', label: l.winter },
  { value: 'summer', label: l.summer },
]
export default function Filter() {
  const animatedComponents = makeAnimated()

  return (
    <div className={s.container}>
      <CreatableSelect
        onChange={handleOption}
        label={l.popularity}
        options={popularity}
        defaultValue={popularity[0]}
        inputId={l.popularity}
      />
      <CreatableSelect
        isClearable
        onChange={handleOption}
        placeholder={l.size}
        label={l.size}
        options={size}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        MultiValueContainer={l.size}
        components={animatedComponents}
        inputId={l.size}
      />
      <CreatableSelect
        isClearable
        onChange={handleOption}
        placeholder={l.material}
        options={material}
        inputId={l.material}
      />
      <CreatableSelect
        isClearable
        onChange={handleOption}
        placeholder={l.color}
        options={color}
        inputId={l.color}
      />
      <CreatableSelect
        isClearable
        onChange={handleOption}
        placeholder={l.season}
        options={season}
        inputId={l.season}
      />
    </div>
  )
}
