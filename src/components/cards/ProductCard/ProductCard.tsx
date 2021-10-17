import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getProductsByModel } from '../../../redux/selectors'
import routes from '../../../routes'
import s from './ProductCard.module.scss'
import { IProduct, IState } from '../../../interfaces'

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
            placeholder="blur"
            width={width}
            height={height}
            loader={el => `/products/${el.src}`}
            src={product.getMainImageSrc()}
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
          <span>{product.getMaterial()}</span>
          <span>{product.getPopularity()}</span>
          <span>{product.getAllSizeOptions().map(el => `${el} `)}</span>
        </div>
      </a>
    </Link>
  )
}
