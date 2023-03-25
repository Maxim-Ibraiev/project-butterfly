import formidable from 'formidable'
import {
  idValidation,
  shoppingBagValidation,
  adminLoginValidation,
  fileValidation,
  productToAddValidation,
  updateProductValidation,
} from './middleware/validation'
import { ILoginData, IShoppingBag } from '../../../interfaces'

export default class RequestValidator {
  static shoppingBag = (body: IShoppingBag) => shoppingBagValidation.validate(body)

  static id = (id: string | string[]) => idValidation.validate(id)

  static adminLogin = (body: ILoginData) => adminLoginValidation.validate(body)

  static fileList = (files: formidable.Files) => fileValidation.validate(files)

  static product = product => productToAddValidation.validate(product)

  static productUpdate = product => updateProductValidation.validate(product)
}
