import React from 'react'
import Link from 'next/link'
import s from './MenuMob.module.scss'
import routes from '../../routes'
// import { useSelector } from 'react-redux';
// import { getCategories } from '../../redux/selectors';
import language from '../../language'

export default function MenuMob() {
  // const categories = useSelector(getCategories);

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
