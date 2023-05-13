import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import s from './CategoryGridItem.module.scss'

interface Props {
  text: string
  alt?: string
}

export default function CategoryItem({
  href = '/',
  text = '',
  alt = text,
  sizes,
  src,
}: Props & LinkProps & Omit<ImageProps, 'alt'>) {
  return (
    <Link href={href} passHref className={s.container}>
      <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: 'cover' }} />
      <h3 className={s.text}>{text}</h3>
    </Link>
  )
}
