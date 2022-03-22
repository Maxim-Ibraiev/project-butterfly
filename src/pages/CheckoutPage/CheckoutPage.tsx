import { useRouter } from 'next/router'
import Checkout from '../../components/Checkout'
import Layout from '../../components/Layout'
import ToggleList from '../../components/ToggleList'
import ShoppingBagItem from '../../components/ShoppingBagItem'
import MainButton from '../../components/buttons/MainButton'
import ShoppingBagFooter from '../../components/ShoppingBagFooter'
import { useDevice, useSelectedProducts } from '../../customHook'
import routes from '../../routes'
import s from './CheckoutPage.module.scss'
import language from '../../language'
import { IProduct } from '../../interfaces'

export default function CheckoutPage() {
  const [selectedProducts, setSelectedProducts] = useSelectedProducts()
  const { isDesktop } = useDevice()
  const router = useRouter()

  const handleDelete = (product: IProduct) => {
    const filteredProducts = selectedProducts.filter(el => el.getId() !== product.getId())

    setSelectedProducts(filteredProducts)
  }

  return (
    <Layout>
      <div className={s.wrapper}>
        <div className={s.productsContainer}>
          {selectedProducts.length > 0 ? (
            <>
              <ToggleList title={language.productsInBag} isDefaultOpen={isDesktop}>
                <ul className={s.productList}>
                  {selectedProducts.map(product => (
                    <li key={product.getId()}>
                      <ShoppingBagItem product={product} handleDelete={() => handleDelete(product)} />
                    </li>
                  ))}
                </ul>
              </ToggleList>
              <ShoppingBagFooter className={s.totalSum} />
            </>
          ) : (
            <>
              <p style={{ textAlign: 'center' }}>{language.emptyBag}</p>
              <MainButton className={s.close} handleClick={() => router.push(routes.home)}>
                {language.toHomePage}
              </MainButton>
            </>
          )}
        </div>
        <div className={s.checkout}>
          <Checkout />
        </div>
      </div>
    </Layout>
  )
}
