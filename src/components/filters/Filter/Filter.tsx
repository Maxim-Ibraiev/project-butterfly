import { useState } from 'react'
import cn from 'classnames'
import { SHOPPING_ID } from '../../../constants'
import useFilter from '../../../customHook/useFilter'
import language from '../../../language'
import Chip from '../../buttons/Chip'
import CustomSelector, { HandleChange } from '../../CustomSelector'
import Toggle from '../../icons/Toggle'
import s from './Filter.module.scss'

export default function Filter() {
  const filter = useFilter()
  const [isOpenAllOptions, setIsOpenAllOptions] = useState(false)
  const isNotNeedToReset = Object.keys(filter.query).every(
    el => el === 'category' || el === 'sort' || el === SHOPPING_ID
  )

  const handleChange: HandleChange = (type, value) => {
    const newFilter = filter.define(type, value)

    filter.updateURL(newFilter)
  }

  return (
    <div className={s.container}>
      <div
        className={cn(s.filterContainer, {
          [s.hide]: !isOpenAllOptions,
          [s.wrap]: isOpenAllOptions,
        })}
      >
        <CustomSelector type="sort" value={filter.query.sort} handleChange={handleChange} />
        <CustomSelector type="size" value={filter.query.size} handleChange={handleChange} isMulti />
        <CustomSelector type="material" value={filter.query.material} handleChange={handleChange} isMulti />
        <CustomSelector type="color" value={filter.query.color} handleChange={handleChange} isMulti />
        <CustomSelector type="season" value={filter.query.season} handleChange={handleChange} isMulti />
        {isOpenAllOptions && (
          <>
            <CustomSelector
              type="material"
              value={filter.query.material}
              handleChange={handleChange}
              isMulti
            />
            <CustomSelector
              type="material"
              value={filter.query.material}
              handleChange={handleChange}
              isMulti
            />
            <CustomSelector
              type="material"
              value={filter.query.material}
              handleChange={handleChange}
              isMulti
            />
            <CustomSelector
              type="material"
              value={filter.query.material}
              handleChange={handleChange}
              isMulti
            />
          </>
        )}
      </div>
      <div className={s.controlContainer}>
        <Chip onClick={() => setIsOpenAllOptions(!isOpenAllOptions)} className={s.toggleOption}>
          <span className={cn(s.toggleIcon, { [s.rotaite]: isOpenAllOptions })}>
            <Toggle height="16px" />
          </span>
          <span className={cn({ [s.hide]: isOpenAllOptions })}>
            {isOpenAllOptions ? language.hideFilters : language.allFilters}
          </span>
        </Chip>
        <Chip
          disabled={isNotNeedToReset}
          onClick={() => {
            filter.reset()
            setIsOpenAllOptions(false)
          }}
          className={cn(s.reset, { [s.hide]: !isOpenAllOptions })}
        >
          {language.reset}
        </Chip>
      </div>
    </div>
  )
}
