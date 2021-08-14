import React from 'react'
import Header from '../Header'
import { Categories } from '../../interfaces'
import s from './Layout.module.scss'

interface Props {
  categories: Categories
  className?: string
}

const Layout: React.FC<Props> = ({ categories, className, children }) => (
  <div className={s.container}>
    <Header categories={categories} />

    <main className={className}>{children}</main>

    <footer />
  </div>
)

export default Layout
