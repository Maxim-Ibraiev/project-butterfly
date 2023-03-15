import React from 'react'
import { useForm } from 'react-hook-form'
import { ILoginData, Request } from '../../../interfaces'
import language from '../../../language'
import MainButton from '../../buttons/MainButton'
import Form from '../../Form'
import Input from '../../inputs/Input'
import Text from '../../Text'
import s from './AdminLogin.module.scss'

export type IonSubmit = (data: ILoginData) => void

interface IProps {
  onSubmit: IonSubmit
  isLoading: boolean
  status: Request
}

export default function AdminLogin({ onSubmit, isLoading, status }: IProps) {
  const { register, handleSubmit } = useForm()

  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <Text type="header" component="h1">
        LogIn
      </Text>
      <Input name="login" label={language.login} type="text" register={register} />
      <Input name="password" label={language.password} type="password" register={register} />

      <MainButton isSubmit className={s.submit} status={status} isLoading={isLoading}>
        {language.enterToAdmin}
      </MainButton>
    </Form>
  )
}
