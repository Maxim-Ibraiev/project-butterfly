import Image from 'next/image'
import s from './ProductCard.module.scss'

export default function ProductCard({
  width,
  height,
  src,
  alt,
  price,
  title,
  palette,
  sises,
  material,
}) {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Image width={width} height={height} src={src} alt={alt} />
      </div>
      <div className={s.productDetails}>
        <b className={s.price}>{`${price} грн`}</b>
        <span className={s.title}>{title}</span>
        {sises && (
          <span className={s.sises}>
            {sises.reduce((acc, el) => {
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
