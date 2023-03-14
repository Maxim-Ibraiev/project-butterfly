/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link'
import { CATEGORIES } from '../../constants'
import language from '../../language'
import routes from '../../routes'
import s from './MenuMob.module.scss'

export default function MenuMob({ setIsOpen }) {
  return (
    <ul className={s.container}>
      {CATEGORIES.map(category => (
        <li key={category} className={s.item}>
          <Link href={routes[category]}>
            <a onClick={setIsOpen} role="button">
              {language[category] || category}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
