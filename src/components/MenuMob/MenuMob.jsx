/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getCategories } from '../../redux/selectors.ts'
import routes from '../../routes'
import language from '../../language'
import s from './MenuMob.module.scss'

export default function MenuMob({ setIsOpen }) {
  const categories = useSelector(getCategories)

  return (
    <ul className={s.container}>
      {categories.map(category => (
        <li key={category} className={s.item}>
          <Link href={routes.categories[category]}>
            <a onClick={() => setIsOpen()} role="button">
              {language[category] || category}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
