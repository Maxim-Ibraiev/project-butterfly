import type { ImageLoader } from 'next/image'
import { buildImageUrl } from 'cloudinary-build-url'

const FOLDER_NAME = 'products/'
export const TIMEOUT = 250
export const REVALIDATE = 2000
export const CATEGORIES = ['dress', 'suit', 'jeans', 'shirts', 'largeSizes']
export const UAH = 'Грн'
export const imageLoader: ImageLoader = ({ src }) =>
  buildImageUrl(`${FOLDER_NAME}${src}`, {
    cloud: {
      cloudName: 'butterfly-project',
    },
  })
