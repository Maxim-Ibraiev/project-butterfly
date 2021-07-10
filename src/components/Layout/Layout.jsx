import Header from '../Header'
import s from './Layout.module.scss'

export default function Layout({ className, children }) {
  return (
    <div className={s.container}>
      <Header />

      <main className={className}>{children}</main>

      <footer />
    </div>
  )
}
