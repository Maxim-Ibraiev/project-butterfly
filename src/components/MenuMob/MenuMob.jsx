/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link'
import routes from '../../routes'
import language from '../../language'
import s from './MenuMob.module.scss'
import { useReduceSelectors } from '../../customHook'

export default function MenuMob({ setIsOpen }) {
  const { categories } = useReduceSelectors()

  return (
    <ul className={s.container}>
      {categories.map(category => (
        <li key={category} className={s.item}>
          <Link href={routes.categories[category]}>
            <a onClick={setIsOpen} role="button">
              {language[category] || category}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
