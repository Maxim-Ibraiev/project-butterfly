import { IResponse } from '../interfaces'

export default async function requestSymulat(params, time = 2000): Promise<IResponse<null>> {
  const getData = (): Promise<IResponse<null>> =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: null, error: null, status: 200 })
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(params))
      }, time)
    })

  return getData()
}
