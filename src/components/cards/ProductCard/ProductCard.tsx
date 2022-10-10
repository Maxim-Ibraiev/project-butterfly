import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getDataURL, getProductSrc } from '../../../helpers'
import { IProduct, IState } from '../../../interfaces'
import { getProductsByModel } from '../../../redux/selectors'
import routes from '../../../routes'
import s from './ProductCard.module.scss'

interface Props {
  width: number
  height: number
  product: IProduct
}

export default function ProductCard({ width, height, product }: Props) {
  const allModels = useSelector<IState, IProduct[]>(state => getProductsByModel(state, product.getModel()))

  return (
    <Link href={`${routes.product}/${product.getId()}`}>
      <a className={s.wrapper}>
        <div className={s.image}>
          <Image
            width={width}
            height={height}
            sizes="(max-width: 765px) 364px,
                   (max-width: 999px) 313px,
                   282px"
            placeholder="blur"
            blurDataURL={getDataURL(width, height)}
            src={getProductSrc(product.getMainImageSrc())}
            alt={product.getTitle()}
          />
        </div>
        <div className={s.productDetails}>
          <b className={s.price}>{`${product.getPrice()} грн`}</b>
          <span className={s.title}>{product.getTitle()}</span>
          {product.getAllSizeOptions() && (
            <span className={s.sizes}>
              {product.getAllSizeOptions().reduce((acc, el) => {
                if (!acc) return el

                return `${acc}, ${el}`
              }, '')}
            </span>
          )}
          {allModels.length > 1 && (
            <div className={s.palette}>
              {allModels.map(models => (
                <div key={models.getColor()} style={{ backgroundColor: models.getColor() }} />
              ))}
            </div>
          )}
        </div>
      </a>
    </Link>
  )
}
