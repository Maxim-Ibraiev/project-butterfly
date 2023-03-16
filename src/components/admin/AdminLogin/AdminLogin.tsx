import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ILoginData, Request } from '../../../interfaces'
import language from '../../../language'
import MainButton from '../../buttons/MainButton'
import Form from '../../Form'
import Input from '../../inputs/Input'
import Text from '../../Text'
import api from '../../../api/api'
import routes from '../../../routes'
import s from './AdminLogin.module.scss'

export type IonSubmit = (data: ILoginData) => void

export default function AdminLogin() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const [status, setStatus] = useState<Request>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: IonSubmit = async body => {
    setIsLoading(true)

    try {
      const res = await api.adminLogin(body)

      if (res.data?.auth) {
        setStatus('Success')
        router.push(routes.admin)
      }
    } catch (error) {
      console.warn(error)
      setStatus('Error')
    } finally {
      setIsLoading(false)
    }
  }

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
