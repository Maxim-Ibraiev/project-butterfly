import { Dispatch } from 'redux'
import * as mainActions from '../redux/main/mainActions'
import { ICategoriesProps, IProductsProps } from '../interfaces'

export type IDataResponse = ICategoriesProps | IProductsProps

const getDataName = (response: IDataResponse): string =>
  Object.entries(response).filter(([key]) => key !== 'error')[0][0]

export default function dispatchData(dispatch: Dispatch, ...responses: IDataResponse[]): void {
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
}
