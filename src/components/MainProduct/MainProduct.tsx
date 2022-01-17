import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import PhoneNumber from 'react-phone-number-input/input'
import Gallery from '../Gallery'
import MainButton from '../buttons/MainButton'
import GridOfSizes from '../GridOfSizes'
import Icon from '../icons/Bag'
import { getProductsByModel, getProductById } from '../../redux/selectors'
import { UAH } from '../../constants'
import { getProductSrc } from '../../helpers'
import { useDevice, useSelectedProducts } from '../../customHook'
import routes from '../../routes'
import language from '../../language'
import s from './MainProduct.module.scss'
import NotFoundProduct from '../NotFoundProduct'
import { IProduct, IState, Request } from '../../interfaces'

export default function MainProduct() {
  const router = useRouter()
  const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
  const product = useSelector<IState, IProduct>(state => getProductById(state, idProduct))
  const allModels = useSelector<IState, IProduct[]>(
    state => product && getProductsByModel(state, product.getModel())
  )
  const { isDesktop } = useDevice()
  const [selectedProducts, setSelectedProduct] = useSelectedProducts()
  const [isProductsSelected, setIsProductsSelected] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<E164Number>('+380')
  const [phoneBtnStatus, setPhoneBtnStatus] = useState<Request>()
  const getItems = () =>
    product.getImages().map(el => {
      const original = `/products/${el.original}`
      const thumbnail = `/products/${el.original}`

      return { ...el, thumbnail, original }
    })

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

  const handleSelectProduct = useCallback(() => {
    if (!selectedProducts.some(({ getId }) => getId() === product.getId())) {
      setSelectedProduct([...selectedProducts, product])
    }

    setIsProductsSelected(true)
  }, [selectedProducts, setSelectedProduct, product])

  useEffect(() => {
    setIsProductsSelected(!!product && selectedProducts.some(({ getId }) => getId() === product.getId()))
  }, [selectedProducts])

  return product ? (
    <section className={s.container}>
      <div className={s.galleryWrapper}>
        <Gallery items={getItems()} position={isDesktop ? 'left' : undefined} />
      </div>
      <div className={s.infoContainer}>
        <div className={s.infoSection}>
          <h1 className={s.title}>{product.getTitle()}</h1>
          <b className={s.price}>{`${product.getPrice()} ${UAH}`} </b>
          <b className={s.title}>{language.size}</b>
          <GridOfSizes product={product} />
          <MainButton
            className={cn(s.buyBtn, { [s.productSelected]: isProductsSelected })}
            handleClick={handleSelectProduct}
          >
            {!isProductsSelected && <Icon width="24px" height="24px" />}
            <span>{isProductsSelected ? language.orderProduct : language.toCart}</span>
          </MainButton>
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
                        src={getProductSrc(model.getMainImageSrc())}
                        key={model.getColor()}
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
