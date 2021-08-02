import language from '../language'

export default function getOptionsFormatFromValue(valueOption) {
  if (!valueOption) return null

  return Array.isArray(valueOption)
    ? valueOption.map(element => ({
        value: element,
        label: language[element] || element,
      }))
    : {
        value: valueOption || 'popularity',
        label: language[valueOption] || valueOption,
      }
}
