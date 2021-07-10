import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Modal from 'react-modal'
import cn from 'classnames'
import Menu from '../MenuMob'
import Button from '../buttons/HederBtn'
import { getCategories } from '../../redux/selectors'
import routes from '../../routes'
import language from '../../language'
import s from './Header.module.scss'

Modal.setAppElement('#__next')

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const route = useRouter()
  const categories = useSelector(getCategories)

  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a className={cn(s.logo)}>Butterfly</a>
      </Link>
      <div className={s.nav}>
        <nav>
          <ul className={cn(s.row, s.mobUpper)}>
            {categories &&
              categories.map(category => (
                <li key={category}>
                  <Link href={`/${category}`}>
                    <a
                      className={cn(s.link, {
                        [s.active]:
                          `'/' + ${route.query.category}` ===
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
        <Menu setIsOpen={setIsOpen} />
      </Modal>
    </header>
  )
}
