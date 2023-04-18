import { FormEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import { E164Number } from 'libphonenumber-js/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import PhoneNumber from 'react-phone-number-input/input'
import { SHOPPING_ID, UAH } from '../../constants'
import { useReduceSelectors, useSelectedProducts } from '../../customHook'
import { Request } from '../../interfaces'
import language from '../../language'
import MainButton from '../buttons/MainButton'
import Gallery from '../Gallery'
import GridOfSizes from '../GridOfSizes'
import { BagIcon } from '../icons'
import NotFoundProduct from '../NotFoundProduct'
import routes from '../../routes'
import s from './MainProduct.module.scss'

export default function MainProduct() {
  const router = useRouter()
  const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
  const { getProductById, getProductsByModel } = useReduceSelectors()
  const product = getProductById(idProduct)
  const allModels = getProductsByModel(product.getModel())
  const [selectedProducts, setSelectedProduct] = useSelectedProducts()
  const [isProductSelected, setIsProductSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shoppingId, setShoppingId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<E164Number>('+380')
  const [phoneBtnStatus, setPhoneBtnStatus] = useState<Request>()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (phoneNumber && isValidPhoneNumber(String(phoneNumber))) {
      console.log(phoneNumber)
      console.log(parsePhoneNumber(String(phoneNumber)))

      setPhoneBtnStatus('Success')
      setTimeout(() => setPhoneBtnStatus(null), 1000)
    } else {
      setPhoneBtnStatus('Error')
      setTimeout(() => setPhoneBtnStatus(null), 1000)
    }
  }

  const handleSelectProduct = () => {
    const isNeedToAdd = !selectedProducts.some(({ getId }) => getId() === product.getId())

    if (isNeedToAdd) {
      setSelectedProduct([...selectedProducts, product])
      setIsProductSelected(true)
    }
  }

  useEffect(() => {
    setIsProductSelected(!!product && selectedProducts.some(({ getId }) => getId() === product.getId()))
    if (!shoppingId) setShoppingId(localStorage.getItem(SHOPPING_ID))
  }, [selectedProducts])

  return product ? (
    <section className={s.container}>
      <div className={s.galleryWrapper}>
        <Gallery items={product.getImages()} />
      </div>
      <div className={s.infoContainer}>
        <div className={s.infoSection}>
          <h1 className={s.title}>{product.getTitle()}</h1>
          <span className={s.price}>
            {product.getPrice()} <span className={s.priceValuta}>{UAH}</span>
          </span>
          <b className={s.title}>{language.size}</b>
          <GridOfSizes product={product} />
          {isProductSelected ? (
            <Link href={routes.getCheckout(shoppingId)}>
              <a>
                <MainButton
                  className={cn(s.buyBtn, s.productSelected)}
                  handleClick={() => setIsLoading(true)}
                  isLoading={isLoading}
                >
                  {language.orderProduct}
                </MainButton>
              </a>
            </Link>
          ) : (
            <MainButton className={s.buyBtn} handleClick={handleSelectProduct}>
              <BagIcon height="24px" />
              <span>{language.orderProduct}</span>
            </MainButton>
          )}
          <form className={s.phoneWrapper} onSubmit={handleSubmit}>
            <PhoneNumber
              className={s.phoneInput}
              maxLength={16}
              value={phoneNumber}
              placeholder="+380 97 000 0000"
              onChange={setPhoneNumber}
            />
            <MainButton isSubmit className={s.phoneBtn} status={phoneBtnStatus}>
              {language.buyInOneTouch}
            </MainButton>
          </form>
        </div>
        <div className={s.infoSection}>
          {allModels.length > 1 && (
            <>
              <b className={s.title}>{language.color}</b>
              <div className={s.color}>
                {allModels.map(model => (
                  <Link key={model.getId()} href={`${routes.product}/${model.getId()}`}>
                    <a className={s.colorImg}>
                      <Image
                        src={model.getMainImageSrc()}
                        key={model.getColor().toString()}
                        width={70}
                        height={90}
                        alt={model.getTitle()}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  ) : (
    <NotFoundProduct />
  )
}
