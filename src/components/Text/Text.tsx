import React, { ReactHTML } from 'react'
import classNames from 'classnames'
import s from './Text.module.scss'

interface IPtops {
  component?: keyof ReactHTML
  type?: 'header' | 'title' | 'body'
  className?: string
}

const Text: React.FC<IPtops> = ({ children, component = 'span', type = 'body', className = '' }) => {
  const Component = component
  const styleOptions = {
    [s.header]: type === 'header',
    [s.title]: type === 'title',
    [s.body]: type === 'body',
  }

  return <Component className={classNames(s.container, styleOptions, className)}>{children}</Component>
}

export default Text
