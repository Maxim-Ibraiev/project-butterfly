import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Modal from 'react-modal';
import Menu from '../MenuMob';
import Button from '../buttons/HederBtn';
import s from './Header.module.scss';
import routes from '../../routes';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/selectors';
import { fetchCategories } from '../../redux/main/mainOperations';
import language from '../../language';

Modal.setAppElement('#__next');

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  useEffect(() => {
    if (firstRender) {
      dispatch(fetchCategories());
    }

    setFirstRender(false);
  }, [firstRender]);

  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a onClick={() => dispatch({ type: 'contacts/count', payload: 1 })}>
          <b>LOGO</b>
        </a>
      </Link>

      <nav>
        <ul className={cn(s.row, s.mobUpper)}>
          {categories.map(category => (
            <li key={category}>
              <Link href={`/${category}`}>
                <a>{language[category]}</a>
              </Link>
            </li>
          ))}
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
