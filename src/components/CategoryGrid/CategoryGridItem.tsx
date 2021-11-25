import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import s from './CategoryGridItem.module.scss'

interface Props {
  text: string
}

export default function CategoryItem({
  href = '/',
  text = '',
  sizes,
  src,
  alt,
  width,
  height,
  layout,
}: Props & LinkProps & ImageProps) {
  return (
    <Link href={href}>
      <a className={s.container}>
        <Image src={src} alt={alt} width={width} height={height} layout={layout} sizes={sizes} />
        <div className={s.layout} />
        <h3 className={s.text}>{text}</h3>
      </a>
    </Link>
  )
}
