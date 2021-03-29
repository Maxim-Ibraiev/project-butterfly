import React from 'react';
import Link from 'next/link';
import s from './MenuMob.module.scss';
import routes from '../../routes';

const { category } = routes;

export default function MenuMob() {
  return (
    <ul className={s.container}>
      <li className={s.item}>
        <Link href={category.dress}>
          <a>Платья</a>
        </Link>
      </li>
      <li className={s.item}>
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
      </li>
    </ul>
  );
}
