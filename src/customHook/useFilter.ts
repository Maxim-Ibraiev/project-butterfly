import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DEFAULT_SORT_FOR_PRODUCTS } from '../constants'
import { arrayWrapper, HandlerError, getFilteredProducts } from '../helpers'

import { InitialFilter, FilterQuery, IProduct } from '../interfaces'

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
      sort: { value: [DEFAULT_SORT_FOR_PRODUCTS] },
    })

    updateURL(copyQuery)
  }

  const getQueryProducts = (products: IProduct[]) => getFilteredProducts(products, query)

  useEffect(() => {
    setQuery(filterChecker(router.query))
  }, [router.query])

  return { query, define, reset, updateURL, getQueryProducts }
}

function filterChecker(filter: InitialFilter): FilterQuery {
  if (
    (Array.isArray(filter.category) && filter.category.length > 0) ||
    (Array.isArray(filter.sort) && filter.sort.length > 0)
  ) {
    console.warn(`Category and sort have to be single.`)
  }

  const reducedFilter = Object.entries(filter).reduce((acc, [key, value]) => {
    if (key === 'sort') {
      acc[key] =
        arrayWrapper(filter.sort).length === 0 ? [DEFAULT_SORT_FOR_PRODUCTS] : arrayWrapper(filter.sort || [])
    } else {
      acc[key] = arrayWrapper(value)
    }

    return acc
  }, {})

  return reducedFilter
}
