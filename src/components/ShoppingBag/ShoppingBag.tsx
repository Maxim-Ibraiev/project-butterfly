import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { useSelectedProducts } from '../../customHook'
import language from '../../language'
import Button from '../buttons/MainButton'
import ShoppingBagItem from '../ShoppingBagItem'
import CloseSvg from '../icons/Close'
import s from './ShoppingBag.module.scss'
import { UAH } from '../../constants'

interface Props {
  isOpen: Dispatch<SetStateAction<boolean>>
}

export default function ShoppingBag({ isOpen }: Props) {
  const [selectedProducts, setSelectedProducts] = useSelectedProducts()

  return (
    <section className={s.wrapper}>
      <Button handleClick={() => isOpen(false)} className={s.x}>
        <CloseSvg />
      </Button>

      <p className={s.title}>{language.productsInBag}</p>

      {selectedProducts.length > 0 ? (
        <div className={s.container}>
          {selectedProducts.map(product => (
            <ShoppingBagItem
              key={product.id}
              product={product}
              handleClose={() => {
                setSelectedProducts(selectedProducts.filter(el => el.id !== product.id))
              }}
            />
          ))}
          <div className={s.totalContainer}>
            <span className={s.totalTitle}>{language.orderResults}</span>
            <div className={s.totalItem}>
              <span>{language.total}</span>
              <span>
                {selectedProducts.reduce((acc, el) => acc + el.price, 0)} {UAH}
              </span>
            </div>
          </div>
          <div className={s.footer}>
            <Button handleClick={() => isOpen(false)}>{language.continueShopping}</Button>
            <Button>{language.orderProduct}</Button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ textAlign: 'center' }}>{language.emptyBag}</p>
          <Button className={s.close} handleClick={() => isOpen(false)}>
            {language.close}
          </Button>
        </>
      )}
    </section>
  )
}
