import httpStatusCodes from '../httpStatusCodes'

export default error => ({
  status: httpStatusCodes.INTERNAL_SERVER_ERROR,
  data: null,
  error: { message: error.message, data: error || JSON.stringify(error) || true },
})
