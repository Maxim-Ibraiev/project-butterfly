import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as mainActions from '../redux/main/mainActions'

import type { ICategoriesProps, IProductsProps } from '../interfaces'

export type IDataResponse = ICategoriesProps | IProductsProps

const getDataName = (response: IDataResponse): string =>
  Object.entries(response).filter(([key]) => key !== 'error')[0][0]

export default function useDispatchData(...responses: IDataResponse[]): void {
  const dispatch = useDispatch()
  useEffect(() => {
    responses.forEach(data => {
      if (!data) return
      const actions = { ...mainActions }
      const dataName = getDataName(data)
      const errorName = `${dataName}Error`
      const actionSuccess = `${dataName}Success`
      const actionError = `${dataName}Error`

      if (!data[errorName]) dispatch(actions[actionSuccess](data[dataName]))
      if (data[errorName]) dispatch(actions[actionError](data[actionError]))
    })
  })
}
