import { useState } from 'react'
import cn from 'classnames'
import { SHOPPING_ID } from '../../../constants'
import { useDevice } from '../../../customHook'
import useFilter from '../../../customHook/useFilter'
import language from '../../../language'
import Chip from '../../buttons/Chip'
import Toggle from '../../icons/Toggle'
import CustomSelector, { OnChange } from '../../inputs/CustomSelector'
import s from './Filter.module.scss'

export default function Filter() {
  const filter = useFilter()
  const { isDesktop } = useDevice()
  const [isOpenAllOptions, setIsOpenAllOptions] = useState(false)
  const isNotNeedToReset = Object.keys(filter.query).every(
    el => el === 'globalCategory' || el === 'sort' || el === SHOPPING_ID
  )

  const handleChange: OnChange = (type, value) => {
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
        <CustomSelector type="sort" value={filter.query.sort} onChange={handleChange} />
        <CustomSelector type="category" value={filter.query.category} onChange={handleChange} isMulti />
        <CustomSelector type="size" value={filter.query.size} onChange={handleChange} isMulti />
        <CustomSelector type="material" value={filter.query.material} onChange={handleChange} isMulti />
        <CustomSelector type="color" value={filter.query.color} onChange={handleChange} isMulti />
        {isOpenAllOptions && <></>}
      </div>
      <div className={s.controlContainer}>
        {!isDesktop && (
          <Chip onClick={() => setIsOpenAllOptions(!isOpenAllOptions)} className={s.toggleOption}>
            <span className={cn(s.toggleIcon, { [s.rotaite]: isOpenAllOptions })}>
              <Toggle height="16px" />
            </span>
            <span className={cn({ [s.hide]: isOpenAllOptions })}>
              {isOpenAllOptions ? language.hideFilters : language.allFilters}
            </span>
          </Chip>
        )}
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
