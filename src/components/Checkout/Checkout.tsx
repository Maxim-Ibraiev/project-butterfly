import { useForm } from 'react-hook-form'
import Input from '../inputs/Input'
import language from '../../language'
import MainButton from '../buttons/MainButton'
import s from './Checkout.module.scss'

export default function Checkout() {
  const { register, handleSubmit } = useForm()

  const onSubmit = data => console.log(data)

  return (
    <div className={s.wrapper}>
      <h1>{language.MakingAnOrder}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input label={language.firstName} name="firstName" register={register} required />
        <Input label={language.lastName} name="lastName" register={register} />
        <Input label={language.email} name="email" type="email" register={register} />
        <Input label={language.phoneNumber} name="phoneNumber" type="tel" register={register} required />
        <MainButton isSubmit>{language.confirmOrder}</MainButton>
      </form>
    </div>
  )
}
