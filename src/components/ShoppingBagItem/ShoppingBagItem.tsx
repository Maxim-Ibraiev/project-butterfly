import { useDispatch } from 'react-redux'
import Image from 'next/image'
import CustomSelector from '../CustomSelector'
import Button from '../buttons/MainButton'
import CloseSvg from '../icons/Close'
import * as actions from '../../redux/main/mainActions'
import { getOptionsFormatFromValue, getProductSrc } from '../../helpers'
import language from '../../language'
import s from './ShoppingBagItem.module.scss'
import { IProduct, FilterOption } from '../../interfaces'

interface Props {
  product: IProduct
  handleDelete: () => void
}

export default function ShoppingBagItem({ product, handleDelete }: Props) {
  const dispatch = useDispatch()
  const options = getOptionsFormatFromValue(product.getAllSizeOptions())

  const handleChangeSize = (option: FilterOption) => {
    const payload = { id: product.getId(), selectedSize: Number(option.value) }

    dispatch(actions.setSelectedSizeOfProduct([payload]))
  }

  return (
    <div className={s.wrapper}>
      <Button className={s.close} handleClick={handleDelete}>
        <CloseSvg />
      </Button>
      <div className={s.image}>
        <Image src={getProductSrc(product.getMainImageSrc())} width={80} height={110} />
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
    </div>
  )
}
