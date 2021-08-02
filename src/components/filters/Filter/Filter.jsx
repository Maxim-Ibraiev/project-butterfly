import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import CustomSelector from '../../CustomSelector'
import { getOptionsFormatFromValue } from '../../../helpers'
import s from './Filter.module.scss'
import l from '../../../language'

export default function Filter() {
  const router = useRouter()
  const params = queryString.parseUrl(router.asPath).query

  const [size, setSize] = useState(getOptionsFormatFromValue(params.size))
  const [material, setMaterial] = useState(getOptionsFormatFromValue(params.material))
  const [color, setColor] = useState(getOptionsFormatFromValue(params.color))
  const [season, setSeason] = useState(getOptionsFormatFromValue(params.season))
  const [sort, setSort] = useState(
    getOptionsFormatFromValue(params.sort) || { value: 'popularity', label: l.popularity }
  )

  const handleFilter = dependencies => {
    const allOptions = Object.keys(dependencies)
    const filter = allOptions.reduce((acc, el) => {
      const currentOption = dependencies[el]
      if (currentOption) {
        acc[el] = Array.isArray(currentOption)
          ? currentOption.map(element => element.value)
          : currentOption.value
      } else if (params[el]) {
        acc[el] = params[el]
      }

      return acc
    }, {})

    router.push({
      pathname: router.query.category,
      query: filter,
    })
  }

  useEffect(() => {
    handleFilter({ sort, size, material, color, season })
  }, [sort, size, material, color, season])

  return (
    <div className={s.container}>
      <CustomSelector handleChange={setSort} type="sort" defaultValue={sort} />
      <CustomSelector type="size" defaultValue={size} handleChange={setSize} isMulti />
      <CustomSelector type="material" defaultValue={material} handleChange={setMaterial} isMulti />
      <CustomSelector type="color" defaultValue={color} handleChange={setColor} isMulti />
      <CustomSelector type="season" defaultValue={season} handleChange={setSeason} isMulti />
    </div>
  )
}
