import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Modal from 'react-modal';
import Menu from '../MenuMob';
import Button from '../buttons/HederBtn';
import s from './Header.module.scss';
import routes from '../../routes';
import { useDispatch } from 'react-redux';

const { category } = routes;

Modal.setAppElement('#__next');

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a onClick={() => dispatch({ type: 'contacts/count', payload: 1 })}>
          <b>LOGO</b>
        </a>
      </Link>
      {/* 
      <Button type="button" aria-label="Логотип" style={{ color: '#fff' }}>
        <b>LOGO</b>
      </Button> */}

      <nav>
        <ul className={cn(s.row, s.mobUpper)}>
          <li>
            <Link href={category.dress}>
              <a>Платья</a>
            </Link>
          </li>
          <li>
            <Link href={category.suit}>
              <a>Костюмы</a>
            </Link>
          </li>
          <li>
            <Link href={category.jeans}>
              <a>Джинсы</a>
            </Link>
          </li>
          <li>
            <Link href={category.footballShirt}>
              <a>Футболки</a>
            </Link>
          </li>
          <li>
            <Link href={category.shirt}>
              <a>Рубашки</a>
            </Link>
          </li>
        </ul>
      </nav>

      <ul className={s.row}>
        <li>
          <Button
            type="button"
            aria-label="Отложено"
            src={'/icons/heart.svg'}
          ></Button>
        </li>
        <li className={s.menuBtn}>
          <Button
            type="button"
            aria-label="Меню"
            src={modalIsOpen ? '/icons/close.svg' : '/icons/menu.svg'}
            onClick={() => setIsOpen(!modalIsOpen)}
          ></Button>
        </li>
      </ul>

      <Modal
        className={s.modal}
        overlayClassName={s.overModal}
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Menu />
      </Modal>
    </header>
  );
}
