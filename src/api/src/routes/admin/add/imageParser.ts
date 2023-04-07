import formidable from 'formidable'
import { arrayWrapper } from '../../../../../helpers'
import { IProductObject, IProductToAdd } from '../../../../../interfaces'

type Options = { id: string; color: string; title: string; preImages?: IProductObject['images'] }

export default function imageParser(files: formidable.Files, options: Options): IProductToAdd['images'] {
  const getImageItem = (index: number) => ({
    original: `${options.title}__${index}__${options.id}`,
    thumbnail: `${options.title}__${index}__${options.id}`,
    color: [options.color],
  })

  if (files.myImage) return arrayWrapper(files.myImage).map((_, ind) => getImageItem(ind))

  const images: IProductObject['images'] = []

  for (let index = 0; index < 6; index++) {
    const file = files[`image-${index}`]

    if (file) images[index] = getImageItem(index)
    else images[index] = options.preImages[index]
  }

  return images.filter(Boolean)
}
