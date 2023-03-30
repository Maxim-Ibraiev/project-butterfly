import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { File } from 'formidable'
import getConfig from 'next/config'
import { arrayWrapper } from '../../../../../helpers'

export default class ImageCloud {
  static doConfig() {
    const { imageCloudConfig } = getConfig().serverRuntimeConfig

    cloudinary.config(imageCloudConfig)
  }

  static getURL(src: string, quality?: boolean) {
    this.doConfig()

    return cloudinary.url(`products/${src}`, {
      transformations: { quality: quality ? 30 : 100 },
    })
  }

  static async imageUploader(files: File | File[], title: string, id: string) {
    this.doConfig()

    const arrFiles = arrayWrapper(files)
    const data: UploadApiResponse[] = []

    return new Promise((resolve, reject) => {
      try {
        arrFiles.forEach(async (file, ind) => {
          const res = await cloudinary.uploader.upload(file.filepath, {
            folder: 'products',
            public_id: `${title}__${ind}__${id}`,
          })
          data.push(res)

          if (data.length === arrFiles.length) {
            resolve(data)
          }
        })
      } catch (error) {
        console.error('imageUploader ', error)

        reject(error)
      }
    })
  }
}
