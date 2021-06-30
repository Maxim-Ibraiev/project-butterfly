import Header from '../Header'
import s from './Layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={s.container}>
      <Header />

      <main>{children}</main>

      <footer />
    </div>
  )
}
