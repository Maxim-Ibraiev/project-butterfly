import Link from 'next/link'
import s from './MenuMob.module.scss'
import routes from '../../routes'
import language from '../../language'

export default function MenuMob() {
  return (
    <ul className={s.container}>
      {routes.categories.map(category => (
        <li key={category} className={s.item}>
          <Link href={routes.categories[category]}>
            <a>{language[category]}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
