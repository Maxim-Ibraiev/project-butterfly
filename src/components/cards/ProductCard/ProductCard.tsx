import Image from 'next/image'
import Link from 'next/link'
import routes from '../../../routes'
import s from './ProductCard.module.scss'

import type { IProduct } from '../../../interfaces'

interface Props {
  width: number
  height: number
  product: IProduct
}

export default function ProductCard({ width, height, product }: Props) {
  const { image, alert, price, title, color, size, material, popularity, id } = product

  return (
    <Link href={`${routes.product}/${id}`}>
      <a className={s.wrapper}>
        <div className={s.image}>
          <Image width={width} height={height} src={image || '/products/ex-2.jpg'} alt={alert} />
        </div>
        <div className={s.productDetails}>
          <b className={s.price}>{`${price} грн`}</b>
          <span className={s.title}>{title}</span>
          {size && (
            <span className={s.sizes}>
              {Object.values(size).reduce((acc, el) => {
                if (!acc) return el

                return `${acc}, ${el}`
              }, '')}
            </span>
          )}
          {color && (
            <div className={s.palette}>
              {color.map(el => (
                <div style={{ backgroundColor: el }} key={el} />
              ))}
            </div>
          )}
          <span>{material}</span>
          <span>{popularity}</span>
        </div>
      </a>
    </Link>
  )
}
