/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import CustomSelector from '../CustomSelector'
import Button from '../buttons/MainButton'
import { CloseIcon } from '../icons'
import * as actions from '../../redux/main/mainActions'
import { getOptionsFormatFromValue, getProductSrc } from '../../helpers'
import language from '../../language'
import s from './ShoppingBagItem.module.scss'
import { IProduct, FilterOption } from '../../interfaces'
import routes from '../../routes'

interface Props {
  product: IProduct
  handleDelete: () => void
  handleClose?: () => void
}

export default function ShoppingBagItem({ product, handleDelete, handleClose }: Props) {
  const dispatch = useDispatch()
  const options = getOptionsFormatFromValue(product.getAllSizeOptions())

  const handleChangeSize = (option: FilterOption) => {
    const payload = { id: product.getId(), selectedSize: Number(option.value) }

    dispatch(actions.setSelectedSizeOfProduct([payload]))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Link href={`${routes.product}/${product.getId()}`}>
          <a onClick={handleClose} className={s.imageLink} style={{ width: '80px', height: '110px' }}>
            <Image src={getProductSrc(product.getMainImageSrc())} width={80} height={110} />
          </a>
        </Link>
      </div>
      <div className={s.info}>
        <span>{product.getTitle()}</span>
        <div className={s.size}>
          <span>{language.size}:</span>
          <div className={s.select}>
            <CustomSelector
              handleChange={handleChangeSize}
              options={options}
              value={product.getSelectedSize() && String(product.getSelectedSize())}
              type="size"
            />
          </div>
        </div>
      </div>
      <Button className={s.close} handleClick={handleDelete}>
        <CloseIcon />
      </Button>
    </div>
  )
}
