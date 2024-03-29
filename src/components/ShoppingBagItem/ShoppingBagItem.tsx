import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { IProduct } from '../../interfaces'
import language from '../../language'
import * as actions from '../../redux/main/mainActions'
import Button from '../buttons/MainButton'
import { CloseIcon } from '../icons'
import CustomSelector, { OnChange } from '../inputs/CustomSelector'
import routes from '../../routes'
import s from './ShoppingBagItem.module.scss'

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface Props {
  product: IProduct
  handleDelete: () => void
  handleClose?: () => void
}

export default function ShoppingBagItem({ product, handleDelete, handleClose }: Props) {
  const dispatch = useDispatch()

  const handleChangeSize: OnChange = (_, option) => {
    const payload = { id: product.getId(), selectedSize: option[0] }

    dispatch(actions.setSelectedSizeOfProduct([payload]))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Link href={`${routes.product}/${product.getId()}`}>
          <a onClick={handleClose} className={s.imageLink} style={{ width: '80px', height: '110px' }}>
            <Image src={product.getMainImageSrc()} width={80} height={110} />
          </a>
        </Link>
      </div>
      <div className={s.info}>
        <span>{product.getTitle()}</span>
        <div className={s.size}>
          <span>{language.size}:</span>
          <div className={s.select}>
            <CustomSelector
              onChange={handleChangeSize}
              value={product.getSelectedSize()}
              type="size"
              menuPosition="fixed"
            />
          </div>
        </div>
      </div>
      <Button className={s.close} handleClick={handleDelete}>
        <CloseIcon height="10px" />
      </Button>
    </div>
  )
}
