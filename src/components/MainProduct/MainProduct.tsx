import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import PhoneNumber from 'react-phone-number-input/input'
import Gallery from '../Gallery'
import MainButton from '../buttons/MainButton'
import Icon from '../icons/Bag'
import { getProductsByModel, getProductById } from '../../redux/selectors'
import { imageLoader, UAH } from '../../constants'
import { useDevice } from '../../customHook'
import language from '../../language'
import s from './MainProduct.module.scss'

import type { IProduct, IState, Request } from '../../interfaces'
import routes from '../../routes'

export default function MainProduct() {
  const router = useRouter()
  const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
  const product = useSelector<IState, IProduct>(state => getProductById(state, idProduct))
  const allModels = useSelector<IState, IProduct[]>(state => getProductsByModel(state, product.model))
  const { isDesktop } = useDevice()
  const [activeBtn, setActiveBtn] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('+380')
  const [phoneBtnStatus, setPhoneBtnStatus] = useState<Request>()

  const items = product.images.map(el => {
    const original = `/products/${el.original}`
    const thumbnail = `/products/${el.original}`

    return { ...el, thumbnail, original }
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      console.log(phoneNumber)
      console.log(parsePhoneNumber(phoneNumber))

      setPhoneBtnStatus('Success')
      setTimeout(() => setPhoneBtnStatus(null), 1000)
    } else {
      setPhoneBtnStatus('Error')
      setTimeout(() => setPhoneBtnStatus(null), 1000)
    }
  }

  return (
    <section className={s.container}>
      <div className={s.galleryWrapper}>
        <Gallery items={items} position={isDesktop ? 'left' : undefined} />
      </div>
      <div className={s.infoContainer}>
        <div className={s.infoSection}>
          <h1 className={s.title}>{product.title}</h1>
          <b className={s.price}>{`${product.price} ${UAH}`} </b>
          <b className={s.title}>{language.size}</b>
          <div className={s.sizeWrapper}>
            {Object.keys(product.size).map(el => (
              <button
                type="button"
                onClick={() => setActiveBtn(el)}
                className={cn(s.baseBtn, {
                  [s.activeBtn]: el === activeBtn,
                  [s.disableBtn]: product.size[el] === 0,
                })}
                key={el}
              >
                {el}
              </button>
            ))}
          </div>
          <MainButton className={s.buyBtn}>
            <Icon width="24px" height="24px" /> {language.toCart}
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
                  <Link href={`${routes.product}/${model.id}`}>
                    <a className={s.colorImg}>
                      <Image
                        src={model.images[0].original}
                        key={model.color}
                        width={70}
                        height={90}
                        loader={imageLoader}
                        alt={model.title}
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
  )
}
