import formidable from 'formidable'
import {
  idValidation,
  shoppingBagValidation,
  adminLoginValidation,
  fileValidation,
  fileListToUpdateValidation,
  productToAddValidation,
  updateProductValidation,
  updateImage,
  imageOptionsValidation,
  fileListToAddValidation,
  // receivingproductforUpdate,
} from './middleware/validation'
import { ILoginData, IShoppingBag } from '../../../interfaces'

export default class RequestValidator {
  static shoppingBag = (body: IShoppingBag) => shoppingBagValidation.validate(body)

  static id = (id: string | string[]) => idValidation.validate(id)

  static adminLogin = (body: ILoginData) => adminLoginValidation.validate(body)

  static fileList = (files: formidable.Files) => fileValidation.validate(files)

  static product = product => productToAddValidation.validate(product)

  static updateImage = product => updateImage.validate(product)

  static productUpdate = product => updateProductValidation.validate(product)

  static imageOptions = product => imageOptionsValidation.validate(product)

  static fileListToUpdate = (files: formidable.Files) => fileListToUpdateValidation.validate(files)

  static fileListToAdd = (files: formidable.Files) => fileListToAddValidation.validate(files)
  // static receivingproductforUpdate = product => receivingproductforUpdate.validate(product)
}
