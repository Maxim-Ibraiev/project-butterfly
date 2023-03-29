import { v2 as cloudinary, UploadApiResponse, ConfigOptions } from 'cloudinary'
import { File } from 'formidable'
import getConfig from 'next/config'
import { arrayWrapper } from '../../../../../helpers'

export default class ImageCloud {
  private static config: ConfigOptions

  constructor() {
    const { imageCloudConfig } = getConfig().serverRuntimeConfig

    ImageCloud.config = imageCloudConfig
  }

  static async imageUploader(files: File | File[], title: string, id: string) {
    cloudinary.config(this.config)
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
