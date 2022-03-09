import React, { FormEventHandler } from 'react'
import s from './Form.module.scss'

interface IProps {
  handleSubmit: (e?: React.BaseSyntheticEvent) => FormEventHandler<HTMLFormElement>
}

const Form: React.FC<IProps> = ({ handleSubmit, children }) => (
  <form onSubmit={handleSubmit()} className={s.wrapper}>
    {children}
  </form>
)

export default Form
