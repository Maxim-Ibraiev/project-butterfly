import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/buttons/MainButton/MainButton'
import Form from '../../components/Form'
import Input from '../../components/inputs/Input'
import Layout from '../../components/Layout'
import Text from '../../components/Text'
import { ICallRequest, Request } from '../../interfaces'
import language from '../../language'
import api from '../../api/api'
import s from './HandMadePage.module.scss'

export default function handMade() {
  const [submitStatus, setSubmitStatus] = useState<Request>(null)

  const form = useForm()
  const handleSubmit = async (data: ICallRequest) => {
    setSubmitStatus('Request')

    const response = await api.callRequest(data)
    console.log(response)

    if (response?.status === 200) {
      setSubmitStatus('Success')
      return
    }

    setSubmitStatus('Error')
  }

  return (
    <Layout>
      <div className={s.wrapper}>
        <Form handleSubmit={form.handleSubmit(handleSubmit)} className={s.container}>
          <Text component="h1" type="header">
            {language.handMagePage.title}
          </Text>
          <Text component="p" type="title">
            {language.handMagePage.description}
          </Text>
          <ul className={s.list}>
            <Text component="li">{language.handMagePage.defineModel}</Text>
            <Text component="li">{language.handMagePage.defineSize}</Text>
            <Text component="li">{language.handMagePage.defineMaterial}</Text>
          </ul>

          <Input register={form.register} name="Name" type="text" label={language.firstName} />
          <Input
            register={form.register}
            name="phoneNumber"
            type="number"
            label={language.phoneNumber}
            required
          />
          <Button className={s.cental} isSubmit status={submitStatus}>
            {language.handMagePage.submit}
          </Button>
        </Form>
      </div>
    </Layout>
  )
}
