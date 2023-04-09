import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import formidable, { File } from 'formidable'
import getConfig from 'next/config'
import { arrayWrapper } from '../../../../../helpers'
import { IProductObject } from '../../../../../interfaces'

type Options = { id: string; color: string; title: string; preImages?: IProductObject['images'] }

const { imageCloudConfig } = getConfig().serverRuntimeConfig

cloudinary.config(imageCloudConfig)

export default class ImageCloud {
  static async imageUploader(files: formidable.Files, options: Options) {
    if (files.myImage) {
      return this.fileUploader(files.myImage, { title: options.title, id: options.id })
    }

    const filePromises: Promise<UploadApiResponse[]>[] = []

    for (let index = 0; index < 6; index++) {
      const file = files[`image-${index}`]
      const originFile = options.preImages[index]

      if (file && originFile) this.deleteImage(originFile)
      if (file) {
        const fileResponse = this.fileUploader(file, { title: options.title, index, id: options.id })

        filePromises.push(fileResponse)
      }
    }

    return Promise.all(filePromises).then(el => el.flat())
  }

  private static async fileUploader(
    files: File | File[],
    options: { title: string; id: string; index?: number }
  ) {
    const arrFiles = arrayWrapper(files)
    const data: UploadApiResponse[] = []

    return new Promise<UploadApiResponse[]>((resolve, reject) => {
      arrFiles.forEach(async (file, ind) => {
        try {
          const res = await cloudinary.uploader.upload(file.filepath, {
            folder: 'products',
            public_id: this.getImageName(options.title, options.index || ind, options.id),
          })
          data.push(res)

          if (data.length === arrFiles.length) {
            resolve(data)
          }
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  static async deleteImage(image: IProductObject['images'][0]) {
    return cloudinary.uploader.destroy(`products/${image.original}`)
  }

  static getImageName(title: string, index: number | string, id: string) {
    return `${title}__${index}__${id}`
  }

  static imageParser(files: formidable.Files, options: Options) {
    if (files.myImage) {
      return arrayWrapper(files.myImage).map((_, ind) => this.getImageItem(ind, options))
    }

    const images: IProductObject['images'] = []

    for (let index = 0; index < 6; index++) {
      const file = files[`image-${index}`]

      if (file) {
        images[index] = this.getImageItem(index, options)
      } else images[index] = options.preImages[index]
    }

    return images.filter(Boolean)
  }

  private static getImageItem = (index: number, options: Options) => ({
    original: ImageCloud.getImageName(options.title, index, options.id),
    thumbnail: ImageCloud.getImageName(options.title, index, options.id),
    color: [options.color],
  })
}
