import Header from '../Header'
import s from './Layout.module.scss'

export default function Layout({ categories, className, children }) {
  return (
    <div className={s.container}>
      <Header categories={categories} />

      <main className={className}>{children}</main>

      <footer />
    </div>
  )
}
