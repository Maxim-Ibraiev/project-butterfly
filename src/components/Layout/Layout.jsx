import Header from '../Header'
import s from './Layout.module.scss'

export default function Layout({ categories, children }) {
  return (
    <div className={s.container}>
      <Header categories={categories} />

      <main>{children}</main>

      <footer />
    </div>
  )
}
