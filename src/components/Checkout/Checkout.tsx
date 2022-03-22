import { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { useRouter } from 'next/router'
import Input from '../inputs/Input'
import language from '../../language'
import MainButton from '../buttons/MainButton'
import s from './Checkout.module.scss'
import { Request } from '../../interfaces'
import { useSelectedProducts } from '../../customHook'

export default function Checkout() {
  const { register, handleSubmit } = useForm()
  const [submitStatus, setSubmitStatus] = useState<Request>()
  const [selectedProducts] = useSelectedProducts()
  const isEmptyShoppingBag = selectedProducts.length === 0

  const onSubmit = data => {
    if (isEmptyShoppingBag) return

    setSubmitStatus('Request')

    setTimeout(() => {
      setSubmitStatus('Success')
      console.log(data)
    }, 1000)
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.header}>{language.makingAnOrder}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input label={language.firstName} name="firstName" register={register} required />
        <Input label={language.lastName} name="lastName" register={register} />
        <Input label={language.email} name="email" type="email" register={register} />
        <Input label={language.phoneNumber} name="phoneNumber" type="tel" register={register} required />
        <MainButton isSubmit status={isEmptyShoppingBag ? 'Error' : submitStatus} className={s.center}>
          {isEmptyShoppingBag ? (
            language.emptyBag
          ) : (
            <span>{submitStatus === 'Success' ? language.orderIsConfirmed : language.confirmOrder}</span>
          )}
        </MainButton>
      </form>
    </div>
  )
}
