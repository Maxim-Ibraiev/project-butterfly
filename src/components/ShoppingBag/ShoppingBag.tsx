import { useRouter } from 'next/router'
import { useSelectedProducts } from '../../customHook'
import language from '../../language'
import Button from '../buttons/MainButton'
import ShoppingBagItem from '../ShoppingBagItem'
import CloseSvg from '../icons/Close'
import s from './ShoppingBag.module.scss'
import { IProduct } from '../../interfaces'
import routes from '../../routes'
import ShoppingBagFooter from '../ShoppingBagFooter'

interface Props {
  handleCloseModal?: () => void
}

export default function ShoppingBag({ handleCloseModal }: Props) {
  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useSelectedProducts()

  const handleDelete = (product: IProduct) => {
    setSelectedProducts(selectedProducts.filter(el => el.getId() !== product.getId()))
  }

  return (
    <section className={s.wrapper}>
      <div className={s.header}>
        <p className={s.title}>{language.productsInBag}</p>

        <Button handleClick={() => handleCloseModal()} className={s.x}>
          <CloseSvg />
        </Button>
      </div>

      {selectedProducts.length > 0 ? (
        <>
          <div className={s.container}>
            {selectedProducts.map(product => (
              <ShoppingBagItem
                key={product.getId()}
                product={product}
                handleDelete={() => handleDelete(product)}
                handleClose={handleCloseModal}
              />
            ))}
          </div>
          <ShoppingBagFooter className={s.footer}>
            <Button handleClick={() => handleCloseModal()}>{language.continueShopping}</Button>
            <Button
              handleClick={() => {
                handleCloseModal()
                router.push(routes.checkout)
              }}
            >
              {language.orderProduct}
            </Button>
          </ShoppingBagFooter>
        </>
      ) : (
        <>
          <p style={{ textAlign: 'center' }}>{language.emptyBag}</p>
          <Button
            className={s.close}
            handleClick={() => (handleCloseModal ? handleCloseModal() : router.push(routes.home))}
          >
            {handleCloseModal ? language.close : language.toHomePage}
          </Button>
        </>
      )}
    </section>
  )
}
