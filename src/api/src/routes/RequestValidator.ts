import { IShoppingBag } from '../../../interfaces'
import { idValidation, shoppingBagValidation } from './middleware/validation'

export default class RequestValidator {
  static shoppingBag = (body: IShoppingBag) => shoppingBagValidation.validate(body)

  static id = (id: string | string[]) => idValidation.validate(id)
}
