import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import l from '../../../language'
import s from './Filter.module.scss'

const options = {
  size: [
    { value: 45, label: 45 },
    { value: 48, label: 48 },
    { value: 50, label: 50 },
    { value: 52, label: 52 },
    { value: 55, label: 55 },
  ],
  popularity: [
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
export default function Filter({ handleFilter }) {
  const [sort, setSort] = useState({ value: 'highPrice' })
  const [size, setSize] = useState([])
  const [material, setMaterial] = useState([])
  const [color, setColor] = useState([])
  const [season, setSeason] = useState([])

  const animatedComponents = makeAnimated()

  useEffect(() => {
    const filters = {
      sort,
      size,
      material,
      color,
      season,
    }

    handleFilter(filters)
  }, [sort, size, material, color, season])

  return (
    <div className={s.container}>
      <div>
        <CreatableSelect
          className={s.selector}
          onChange={setSort}
          label={l.popularity}
          options={options.popularity}
          defaultValue={options.popularity[0]}
          inputId={l.popularity}
        />
      </div>
      <div>
        <CreatableSelect
          className={s.selector}
          isClearable
          onChange={setSize}
          placeholder={l.size}
          label={l.size}
          options={options.size}
          components={animatedComponents}
          inputId={l.size}
          isMulti
          MultiValueContainer={l.size}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
        />
      </div>
      <div>
        <CreatableSelect
          className={s.selector}
          isClearable
          onChange={setMaterial}
          placeholder={l.material}
          options={options.material}
          inputId={l.material}
          isMulti
          components={animatedComponents}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
        />
      </div>
      <CreatableSelect
        isClearable
        onChange={setColor}
        placeholder={l.color}
        options={options.color}
        inputId={l.color}
        isMulti
        components={animatedComponents}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
      <CreatableSelect
        isClearable
        onChange={setSeason}
        placeholder={l.season}
        options={options.season}
        inputId={l.season}
        isMulti
        components={animatedComponents}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
    </div>
  )
}
