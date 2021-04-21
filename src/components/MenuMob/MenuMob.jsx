import React from 'react';
import Link from 'next/link';
import s from './MenuMob.module.scss';
import routes from '../../routes';
import { useSelector } from 'react-redux';
import { getCategories } from '../../redux/selectors';
import language from '../../language';

export default function MenuMob() {
  const categories = useSelector(getCategories);

  return (
    <ul className={s.container}>
      {categories.map(category => (
        <li key={category} className={s.item}>
          <Link href={routes.categories[category]}>
            <a>{language[category]}</a>
          </Link>
        </li>
      ))}
      {/* <li className={s.item}>
        <Link href={category.suit}>
          <a>Костюмы</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href={category.jeans}>
          <a>Джинсы</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href={category.footballShirt}>
          <a>Футболки</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href={category.shirt}>
          <a>Рубашки</a>
        </Link>
      </li> */}
    </ul>
  );
}
