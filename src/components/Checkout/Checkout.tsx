import { useForm } from 'react-hook-form'
import Input from '../inputs/Input'
import language from '../../language'
import MainButton from '../buttons/MainButton'

export default function Checkout() {
  const { register, handleSubmit } = useForm()

  const onSubmit = data => console.log(data)

  return (
    <div>
      <h1>{language.MakingAnOrder}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label={language.firstName} name="firstName" required register={register} />
        <Input label={language.lastName} name="lastName" register={register} />
        <MainButton isSubmit>{language.confirmOrder}</MainButton>
      </form>
    </div>
  )
}
