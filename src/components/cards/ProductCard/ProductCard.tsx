import Image from 'next/image'
import s from './ProductCard.module.scss'

interface Props {
  width: number
  height: number
  price: number
  sizes: number[]
  src: string
  alt: string
  title: string
  material: string[]
  palette: string[]
}

export default function ProductCard({
  width,
  height,
  src,
  alt,
  price,
  title,
  palette,
  sizes,
  material,
}: Props) {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Image width={width} height={height} src={src} alt={alt} />
      </div>
      <div className={s.productDetails}>
        <b className={s.price}>{`${price} грн`}</b>
        <span className={s.title}>{title}</span>
        {sizes && (
          <span className={s.sizes}>
            {sizes.reduce((acc, el) => {
              if (!acc) return el

              return `${acc}, ${el}`
            }, '')}
          </span>
        )}
        {palette && (
          <div className={s.palette}>
            {palette.map(el => (
              <div style={{ backgroundColor: el }} key={el} />
            ))}
          </div>
        )}
        <span>{material}</span>
      </div>
    </div>
  )
}
