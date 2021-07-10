import Image from 'next/image'
import s from './ProductCard.module.scss'

export default function ProductCard({
  width,
  height,
  layout,
  src,
  alt,
  price,
  description,
  palette,
  sises,
}) {
  return (
    <div className={s.wrapper}>
      <Image
        width={width}
        height={height}
        layout={layout}
        src={src}
        alt={alt}
      />
      <b className={s.price}>{price}</b>
      <span className={s.description}>{description}</span>
      <div className="footer">
        {palette &&
          palette.map(el => (
            <div
              className={s.paletteItem}
              style={{ backgroundColor: el }}
              key={el}
            />
          ))}
        {sises && (
          <span className={s.sises}>
            {sises.reduce((acc, el) => {
              if (!acc) return el
              const result = `${acc}, ${el}`

              return result
            }, '')}
          </span>
        )}
      </div>
    </div>
  )
}
