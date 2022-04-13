import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelectedProducts } from '../../customHook'
import language from '../../language'
import Button from '../buttons/MainButton'
import ShoppingBagItem from '../ShoppingBagItem'
import { CloseIcon, LoadingIcon } from '../icons'
import s from './ShoppingBag.module.scss'
import { IProduct } from '../../interfaces'
import routes from '../../routes'
import ShoppingBagFooter from '../ShoppingBagFooter'
import { SHOPPING_ID } from '../../constants'

interface Props {
  handleCloseModal?: () => void
}

export default function ShoppingBag({ handleCloseModal }: Props) {
  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useSelectedProducts()
  const [shoppingId, setShoppingId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = (product: IProduct) => {
    setSelectedProducts(selectedProducts.filter(el => el.getId() !== product.getId()))
  }

  const handleOrder = () => {
    if (routes.getCheckout(shoppingId) === router.asPath) handleCloseModal()
    else setIsLoading(true)
  }

  useEffect(() => {
    setShoppingId(localStorage.getItem(SHOPPING_ID))
  }, [])

  return (
    <section className={s.wrapper}>
      <div className={s.header}>
        <p className={s.title}>{language.productsInBag}</p>

        <Button handleClick={() => handleCloseModal()} className={s.x}>
          <CloseIcon />
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
            <Button className={s.secondaryBottom} handleClick={() => handleCloseModal()}>
              {language.continueShopping}
            </Button>
            <Link href={routes.getCheckout(shoppingId)}>
              <a className={s.primaryBottom}>
                <Button handleClick={handleOrder}>
                  {isLoading ? <LoadingIcon /> : language.orderProduct}
                </Button>
              </a>
            </Link>
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
