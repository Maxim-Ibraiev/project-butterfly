import { useRouter } from 'next/router'
import { useSelectedProducts } from '../../customHook'
import language from '../../language'
import Button from '../buttons/MainButton'
import ShoppingBagItem from '../ShoppingBagItem'
import CloseSvg from '../icons/Close'
import s from './ShoppingBag.module.scss'
import { UAH } from '../../constants'
import { IProduct } from '../../interfaces'
import routes from '../../routes'

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

        {handleCloseModal && (
          <Button handleClick={() => handleCloseModal()} className={s.x}>
            <CloseSvg />
          </Button>
        )}
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
            {handleCloseModal && (
              <div className={s.footerBottoms}>
                <Button handleClick={() => handleCloseModal()}>{language.continueShopping}</Button>
                <Button
                  handleClick={() => {
                    handleCloseModal()
                    router.push(routes.checkout)
                  }}
                >
                  {language.orderProduct}
                </Button>
              </div>
            )}
          </div>
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
