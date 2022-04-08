import httpStatusCodes from '../httpStatusCodes'

class Responser {
  static getBaseResponse = ({ status, data, error = null, message = error?.message || null }) => ({
    status,
    data,
    error: message ? { message, data: error || JSON.stringify(error) || true } : error,
  })

  static getOK({ data, error = null }) {
    return this.getBaseResponse({ data, status: httpStatusCodes.OK, error })
  }

  static getBadRequest(error) {
    return this.getBaseResponse({ status: httpStatusCodes.BAD_REQUEST, data: null, error })
  }

  static getNotFound({ error, data }) {
    return this.getBaseResponse({ data, status: httpStatusCodes.NOT_FOUND, error })
  }

  static getMethodNotAllowed(method: string) {
    return this.getBaseResponse({
      status: httpStatusCodes.METHOD_NOT_ALLOWED,
      data: null,
      error: true,
      message: `Method "${method}" not allowed`,
    })
  }

  static getServerError(error) {
    return this.getBaseResponse({ status: httpStatusCodes.INTERNAL_SERVER_ERROR, data: null, error })
  }
}

export default Responser
