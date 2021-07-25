import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
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

// function defaultValue(optionsArr, value) {
//   if (Array.isArray(value)) {
//     return optionsArr.filter(option => value.some(el => el === option.value))
//   }
//   if (typeof value === 'string') {
//     return optionsArr.filter(option => option.value === value)
//   }

//   return []
// }

export default function Filter() {
  const router = useRouter()
  const [sort, setSort] = useState({ value: 'highPrice', label: l.highPrice })
  const [size, setSize] = useState()
  const [material, setMaterial] = useState()
  const [color, setColor] = useState()
  const [season, setSeason] = useState()
  const [filterChanged, setFilterChanged] = useState(false)
  const animatedComponents = makeAnimated()
  const [defaultValue, setDefaultValue] = useState()

  const handleFilter = dependencies => {
    if (!filterChanged) {
      setFilterChanged(true)
      return
    }

    const allOptions = Object.keys(options)
    const filter = allOptions.reduce((acc, el) => {
      if (dependencies[el]) {
        acc[el] = Array.isArray(dependencies[el])
          ? dependencies[el].map(element => element.value)
          : dependencies[el].value
      } else if (router.query[el]) {
        acc[el] = router.query[el]
      }

      return acc
    }, {})

    router.push({
      pathname: router.query.category,
      query: filter,
    })
  }
  const handleSelected = option => {
    if (Array.isArray(router.query.size))
      return router.query.size.some(el => Number(el) === option.value)

    return Number(router.query.size) === option.value
  }

  useEffect(() => {
    if (Array.isArray(router.query.size)) {
      setDefaultValue(router.query.size.map(el => ({ value: el, label: el })))
    } else if (router.query.size) {
      setDefaultValue({ value: router.query.size, label: router.query.size })
    }
  }, [router.query])

  useEffect(() => {
    handleFilter({ sort, size, material, color, season })
  }, [sort, size, material, color, season])

  return (
    <div className={s.container}>
      <div>
        <Select
          className={s.selector}
          onChange={setSort}
          label={l.popularity}
          options={options.sort}
          defaultValue={sort}
          inputId={l.popularity}
          isSearchable={false}
        />
      </div>
      <div>
        <Select
          className={s.selector}
          isClearable
          onChange={setSize}
          placeholder={l.size}
          label={l.size}
          options={options.size}
          value={size || defaultValue}
          components={animatedComponents}
          isOptionSelected={handleSelected}
          inputId={l.size}
          isMulti
          MultiValueContainer={l.size}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
        />
      </div>
      <div>
        <Select
          className={s.selector}
          isClearable
          onChange={setMaterial}
          placeholder={l.material}
          options={options.material}
          defaultValue={material}
          inputId={l.material}
          isMulti
          components={animatedComponents}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isSearchable={false}
        />
      </div>
      <Select
        isClearable
        onChange={setColor}
        placeholder={l.color}
        options={options.color}
        defaultValue={color}
        inputId={l.color}
        isMulti
        components={animatedComponents}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable={false}
      />
      <Select
        isClearable
        onChange={setSeason}
        placeholder={l.season}
        options={options.season}
        defaultValue={season}
        inputId={l.season}
        isMulti
        components={animatedComponents}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable={false}
      />
    </div>
  )
}
