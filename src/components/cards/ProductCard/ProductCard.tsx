import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getProductsByModel } from '../../../redux/selectors'
import routes from '../../../routes'
import s from './ProductCard.module.scss'

import type { IProduct, IState } from '../../../interfaces'

interface Props {
  width: number
  height: number
  product: IProduct
}

export default function ProductCard({ width, height, product }: Props) {
  const { images, price, title, size, material, popularity, id, model } = product
  const allModels = useSelector<IState, IProduct[]>(state => getProductsByModel(state, model))

  return (
    <Link href={`${routes.product}/${id}`}>
      <a className={s.wrapper}>
        <div className={s.image}>
          <Image
            width={width}
            height={height}
            loader={el => `/products/${el.src}`}
            src={images[0].original}
            alt={title}
          />
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
          {allModels.length > 1 && (
            <div className={s.palette}>
              {allModels.map(models => (
                <div key={models.color} style={{ backgroundColor: models.color }} />
              ))}
            </div>
          )}
          <span>{material}</span>
          <span>{popularity}</span>
          <span>{Object.keys(size).map(el => `${el} `)}</span>
        </div>
      </a>
    </Link>
  )
}
