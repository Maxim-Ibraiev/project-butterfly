import React from 'react'
import cn from 'classnames'
import s from './Layout.module.scss'
import Footer from '../Footer'
import Header from '../Header'

interface Props {
  className?: string
}

const Layout: React.FC<Props> = ({ className, children }) => (
  <div className={s.container}>
    <Header />
    <main className={cn(s.main, className)}>{children}</main>
    <Footer />
  </div>
)

export default Layout
