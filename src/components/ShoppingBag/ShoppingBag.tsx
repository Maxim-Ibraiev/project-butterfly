import { useSelectedProducts } from '../../customHook'
import language from '../../language'
import Button from '../buttons/MainButton'
import ShoppingBagItem from '../ShoppingBagItem'
import CloseSvg from '../icons/Close'
import s from './ShoppingBag.module.scss'
import { UAH } from '../../constants'

interface Props {
  isOpen: () => void
}

export default function ShoppingBag({ isOpen }: Props) {
  const [selectedProducts, setSelectedProducts] = useSelectedProducts()

  const handleClose = product => {
    setSelectedProducts(selectedProducts.filter(el => el.getId() !== product.getId()))
  }
  return (
    <section className={s.wrapper}>
      <Button handleClick={() => isOpen()} className={s.x}>
        <CloseSvg />
      </Button>

      <p className={s.title}>{language.productsInBag}</p>

      {selectedProducts.length > 0 ? (
        <div className={s.container}>
          {selectedProducts.map(product => (
            <ShoppingBagItem
              key={product.getId()}
              product={product}
              handleClose={() => handleClose(product)}
            />
          ))}
          <div className={s.footer}>
            <div className={s.totalContainer}>
              <span className={s.totalTitle}>{language.orderResults}</span>
              <div className={s.totalItem}>
                <span>{language.total}</span>
                <span>
                  {selectedProducts.reduce((acc, el) => acc + el.getPrice(), 0)} {UAH}
                </span>
              </div>
            </div>
            <div className={s.footerBottoms}>
              <Button handleClick={() => isOpen()}>{language.continueShopping}</Button>
              <Button>{language.orderProduct}</Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p style={{ textAlign: 'center' }}>{language.emptyBag}</p>
          <Button className={s.close} handleClick={() => isOpen()}>
            {language.close}
          </Button>
        </>
      )}
    </section>
  )
}
