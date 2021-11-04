import type { ImageLoader } from 'next/image'
// import { buildImageUrl } from 'cloudinary-build-url'

// const FOLDER_NAME = 'products/'
const imageLoader: ImageLoader = ({ src }) => `/products/${src}`
// buildImageUrl(`${FOLDER_NAME}${src}`, {
//   cloud: {
//     cloudName: 'butterfly-project',
//   },
// })

export default imageLoader
