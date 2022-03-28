import { useEffect, useState } from 'react'
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
  const [selectedProducts, setSelectedProducts] = useSelectedProducts()
  const isEmptyShoppingBag = selectedProducts.length === 0

  const onSubmit = data => {
    if (isEmptyShoppingBag) return

    setSubmitStatus('Request')

    setTimeout(() => {
      setSubmitStatus('Success')
      console.log(Object.assign(data, { selectedProducts }))
      setSelectedProducts([])
    }, 1000)
  }

  useEffect(() => {
    if (submitStatus === 'Success') return
    if (selectedProducts.length === 0) setSubmitStatus('Error')
    else if (!submitStatus || submitStatus === 'Error') setSubmitStatus(null)
  }, [selectedProducts])

  return (
    <div className={s.wrapper}>
      <h1 className={s.header}>{language.makingAnOrder}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input label={language.firstName} name="firstName" register={register} required />
        <Input label={language.lastName} name="lastName" register={register} />
        <Input label={language.email} name="email" type="email" register={register} />
        <Input label={language.phoneNumber} name="phoneNumber" type="tel" register={register} required />
        <MainButton isSubmit status={submitStatus} className={s.center}>
          {(submitStatus === 'Request' || !submitStatus) && <span>{language.confirmOrder}</span>}
          {submitStatus === 'Success' && <span>{language.orderIsConfirmed}</span>}
          {submitStatus === 'Error' && <span>{language.emptyBag}</span>}
        </MainButton>
      </form>
    </div>
  )
}
