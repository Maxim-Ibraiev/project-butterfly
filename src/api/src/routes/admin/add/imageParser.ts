import formidable from 'formidable'
import { arrayWrapper } from '../../../../../helpers'
import { IProductToAdd } from '../../../../../interfaces'

type Options = { id: string; color: string; title: string }

export default function imageParser(files: formidable.Files, options: Options): IProductToAdd['images'] {
  return arrayWrapper(files.myImage).map((_, ind) => ({
    original: `${options.title}__${ind}__${options.id}`,
    thumbnail: `${options.title}__${ind}__${options.id}`,
    color: [options.color],
  }))
}
