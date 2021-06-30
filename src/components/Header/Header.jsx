import { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Modal from 'react-modal'
import Menu from '../MenuMob'
import Button from '../buttons/HederBtn'
import s from './Header.module.scss'
import routes from '../../routes'
import language from '../../language'

Modal.setAppElement('#__next')

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false)

  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a className={cn(s.logo)}>Butterfly</a>
      </Link>
      <div className={s.nav}>
        <nav>
          <ul className={cn(s.row, s.mobUpper)}>
            {routes.categories.map(category => (
              <li key={category}>
                <Link href={`/${category}`}>
                  <a
                    className={cn(s.link, {
                      [s.active]:
                        `'/' + ${routes.query.category}` ===
                        routes.categories[category],
                    })}
                  >
                    <b>{language[category]}</b>
                  </a>
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
              src="/icons/heart.svg"
            />
          </li>
          <li className={s.menuBtn}>
            <Button
              type="button"
              aria-label="Меню"
              src={modalIsOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              onClick={() => setIsOpen(!modalIsOpen)}
            />
          </li>
        </ul>
      </div>

      <Modal
        className={s.modal}
        overlayClassName={s.overModal}
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Menu />
      </Modal>
    </header>
  )
}
