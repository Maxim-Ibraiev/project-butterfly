import type { ImageLoader } from 'next/image'

export const TIMEOUT = 250
export const REVALIDATE = 2000
export const CATEGORIES = ['dress', 'suit', 'jeans', 'shirts', 'largeSizes']
export const UAH = 'Грн'
export const imageLoader: ImageLoader = ({ src }) => `/products/${src}`
