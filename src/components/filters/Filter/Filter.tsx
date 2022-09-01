import useFilter from '../../../customHook/useFilter'
import Chip from '../../buttons/Chip'
import CustomSelector from '../../CustomSelector'
import s from './Filter.module.scss'

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
      <Chip onClick={() => filter.reset()}>reset</Chip>
      <Chip onClick={() => filter.updateURL()}>search</Chip>
    </div>
  )
}
