import React from 'react'
import classNames from 'classnames'
import s from './Form.module.scss'

interface IProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  className?: string
}

const Form: React.FC<IProps> = ({ handleSubmit, children, className = '' }) => (
  <form onSubmit={handleSubmit} className={classNames(s.wrapper, className)}>
    {children}
  </form>
)

export default Form
