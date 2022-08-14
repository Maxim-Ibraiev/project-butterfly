import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { arrayWrapper, HandlerError } from '../helpers'
import { InitialFilter } from '../interfaces'

export default function useFilter() {
  const router = useRouter()
  const [query, setQuery] = useState(filterChecker(router.query))

  const define = (option: keyof InitialFilter, values: string[]) => {
    HandlerError.stringType({ option })
    HandlerError.arrOfStringsType({ values })

    setQuery({ ...query, [option]: values })

    return { ...query, [option]: values }
  }

  const updateURL = (newQuery?: typeof query) => {
    router.replace({
      query: newQuery || query,
    })
  }

  const reset = () => {
    const keys = Object.keys(query)
    const copyQuery = { ...query }

    keys.forEach(key => {
      Object.defineProperty(copyQuery, key, { value: [] })
    })

    Object.defineProperties(copyQuery, {
      category: { value: arrayWrapper(router.query.category) },
      sort: { value: ['popularity'] },
    })

    setQuery(copyQuery)
    updateURL(copyQuery)
  }

  useEffect(() => {
    setQuery(filterChecker(router.query))
  }, [router.query])

  return { query, define, reset, updateURL }
}

function filterChecker(filter: InitialFilter) {
  if (
    (Array.isArray(filter.category) && filter.category.length > 0) ||
    (Array.isArray(filter.sort) && filter.sort.length > 0)
  ) {
    console.warn(`Category and sort have to be single.`)
  }

  const category = arrayWrapper(filter.category) || []
  const sort = arrayWrapper(filter.sort).length === 0 ? ['popularity'] : arrayWrapper(filter.sort) || []

  return { ...filter, category, sort }
}
