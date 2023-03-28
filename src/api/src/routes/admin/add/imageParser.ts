import formidable from 'formidable'
import { arrayWrapper } from '../../../../../helpers'
import { IProductToAdd } from '../../../../../interfaces'

export default function imageParser(files: formidable.Files, color: string): IProductToAdd['images'] {
  return arrayWrapper(files.myImage).map(el => ({
    original: el.newFilename,
    thumbnail: el.newFilename,
    color: [color],
  }))
}
