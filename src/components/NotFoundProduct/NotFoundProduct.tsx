import router from 'next/router'
import language from '../../language'
import routes from '../../routes'
import Button from '../buttons/MainButton'
import s from './NotFoundProduct.module.scss'

export default function NotFoundProduct() {
  return (
    <div className={s.wrapper}>
      <h1>{language.noProducts}</h1>
      <Button handleClick={() => router.push(routes.home)}>{language.toHomePage}</Button>
    </div>
  )
}
