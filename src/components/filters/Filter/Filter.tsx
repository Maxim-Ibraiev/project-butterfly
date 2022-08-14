import CustomSelector from '../../CustomSelector'
import s from './Filter.module.scss'
import useFilter from '../../../customHook/useFilter'

// interface IProps {}

export default function Filter() {
  const filter = useFilter()

  return (
    <div className={s.container}>
      <CustomSelector type="sort" value={filter.query.sort} handleChange={filter.define} />
      <CustomSelector type="size" value={filter.query.size} handleChange={filter.define} isMulti />
      <CustomSelector type="material" value={filter.query.material} handleChange={filter.define} isMulti />
      <CustomSelector type="color" value={filter.query.color} handleChange={filter.define} isMulti />
      <CustomSelector type="season" value={filter.query.season} handleChange={filter.define} isMulti />
      <button type="button" onClick={() => filter.reset()}>
        reset
      </button>
      <button type="button" onClick={() => filter.updateURL()}>
        search
      </button>
    </div>
  )
}
