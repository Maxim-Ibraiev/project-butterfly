import { IError, IResponse } from '../../../interfaces'
import httpStatusCodes from '../httpStatusCodes'

type InputData<Type> = {
  status: number
  data?: Type
  error?: IError
  message?: string
}

class Responser {
  static getBaseResponse<T = null>({
    status,
    data = null,
    error = null,
    message = error?.message || null,
  }: InputData<T>): IResponse<T> {
    return {
      status,
      data,
      error: message ? { message, data: error || JSON.stringify(error) || true } : error,
    }
  }

  static getOK<T>(data: T) {
    return this.getBaseResponse({ data, status: httpStatusCodes.OK })
  }

  static getBadRequest(error: IError) {
    return this.getBaseResponse({ status: httpStatusCodes.BAD_REQUEST, error })
  }

  static getNotFound<T>(error: IError, data?: T) {
    return this.getBaseResponse({ data, status: httpStatusCodes.NOT_FOUND, error })
  }

  static getMethodNotAllowed(method: string) {
    return this.getBaseResponse({
      status: httpStatusCodes.METHOD_NOT_ALLOWED,
      error: {
        message: `Method "${method}" not allowed`,
        data: null,
      },
    })
  }

  static getServerError(error: IError) {
    return this.getBaseResponse({ status: httpStatusCodes.INTERNAL_SERVER_ERROR, error })
  }
}

export default Responser
