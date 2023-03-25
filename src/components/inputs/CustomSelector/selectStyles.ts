import { defaultTheme, GroupTypeBase, Styles } from 'react-select'
import { FilterOption } from '../../../interfaces'

const styles: Partial<Styles<FilterOption, boolean, GroupTypeBase<FilterOption>>> = {
  placeholder: pre => ({ ...pre, position: 'static', transform: 'none', width: 'auto', margin: 0 }),
  menu: pre => ({ ...pre, minWidth: 'max-content' }),
  multiValue: pre => ({ ...pre, marginLeft: 2, marginRight: 2 }),
  control: (pre, state) => ({
    ...pre,
    borderColor: state.hasValue ? 'black' : defaultTheme.colors.neutral20,
    maxHeight: '100%',
  }),
  singleValue: pre => ({ ...pre, position: 'static', transform: 'none', maxWidth: 'auto' }),
  valueContainer: (pre, state) => ({
    ...pre,
    paddingRight: state.hasValue && state.isMulti ? 0 : 8,
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    height: 30,
  }),
}

export default styles
