import type { OptionsType } from 'react-select'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CustomSelector from '../../CustomSelector'
import s from './Filter.module.scss'

import type { FilterOption, InitialFilter } from '../../../interfaces'

type HandleFilter = (option: OptionsType<FilterOption>, type: string) => void

export default function Filter() {
  const router = useRouter()

  const initialFilter: InitialFilter = router.query

  const [filter, setFilter] = useState(initialFilter)
  const [isFirstSetFilter, setIsFistSetFilter] = useState(true)

  const handleFilter: HandleFilter = (option, type) => {
    const pathname = Array.isArray(router.query.category) ? router.query.category[0] : router.query.category
    const newOption = Array.isArray(option) ? option : [option]
    let newFilter = null
    if (newOption[0]) {
      newFilter = { ...filter, [type]: newOption.map(el => el.value) }
    } else {
      delete filter[type]

      newFilter = filter
    }

    delete newFilter.category

    router.replace({
      pathname,
      query: newFilter,
    })

    setFilter(newFilter)
  }

  useEffect(() => {
    if (isFirstSetFilter && Object.keys(router.query).length > 1) {
      setFilter(router.query)
      setIsFistSetFilter(false)
    }
  }, [router.query, isFirstSetFilter])

  return (
    <div className={s.container}>
      <CustomSelector type="sort" value={filter.sort} handleChange={handleFilter} label="sort" />
      <CustomSelector type="size" value={filter.size} handleChange={handleFilter} isMulti />
      <CustomSelector type="material" value={filter.material} handleChange={handleFilter} isMulti />
      <CustomSelector type="color" value={filter.color} handleChange={handleFilter} isMulti />
      <CustomSelector type="season" value={filter.season} handleChange={handleFilter} isMulti />
    </div>
  )
}
