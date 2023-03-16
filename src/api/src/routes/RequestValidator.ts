import { idValidation, shoppingBagValidation, adminLoginValidation } from './middleware/validation'
import { ILoginData, IShoppingBag } from '../../../interfaces'

export default class RequestValidator {
  static shoppingBag = (body: IShoppingBag) => shoppingBagValidation.validate(body)

  static id = (id: string | string[]) => idValidation.validate(id)

  static adminLogin = (body: ILoginData) => adminLoginValidation.validate(body)
}
