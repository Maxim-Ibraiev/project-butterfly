import Joi from 'joi'
import { Categories, IAdmin, IError, IProductObject, IResponse, IShoppingBag } from '../../../interfaces'
import httpStatusCodes from '../httpStatusCodes'

type InputData<Type> = {
  status: number
  data?: Type
  error?: IError
  message?: string
}
type Data = Categories | IProductObject | IProductObject[] | IProductObject['images'] | IShoppingBag | IAdmin

class Responser {
  static getBaseResponse<T extends Data = null>({
    status,
    data = null,
    error = null,
    message = error?.message || null,
  }: InputData<T>): IResponse<T> {
    return {
      status,
      data,
      error: error ? { message, data: error.data || JSON.stringify(error) } : error,
    }
  }

  static getOK<T extends Data>(data: T) {
    return this.getBaseResponse({ data, status: httpStatusCodes.OK })
  }

  static getNoContent() {
    return this.getBaseResponse({ status: httpStatusCodes.NoContent })
  }

  static getBadRequest(error: Joi.ValidationError) {
    return this.getBaseResponse({
      status: httpStatusCodes.BAD_REQUEST,
      error: { message: error.message, data: error },
    })
  }

  static getNotFound<T extends Data>(error: IError, data?: T) {
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

  static getForbidden(error: IError) {
    return this.getBaseResponse({ status: httpStatusCodes.FORBIDDEN, error })
  }

  static getServerError(error: IError) {
    console.error('Server error middleware, ', error)

    return this.getBaseResponse({ status: httpStatusCodes.INTERNAL_SERVER_ERROR, error })
  }
}

export default Responser
