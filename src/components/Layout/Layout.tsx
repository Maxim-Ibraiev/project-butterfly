import React from 'react'
import Header from '../Header'
import s from './Layout.module.scss'

interface Props {
  className?: string
}

const Layout: React.FC<Props> = ({ className, children }) => (
  <div className={s.container}>
    <Header />

    <main className={className}>{children}</main>

    <footer />
  </div>
)

export default Layout
