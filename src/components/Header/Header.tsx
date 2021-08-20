import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import queryString from 'query-string'
import cn from 'classnames'
import Menu from '../MenuMob'
import Button from '../buttons/HederBtn'
import { getCategories } from '../../redux/selectors'
import routes from '../../routes'
import language from '../../language'
import s from './Header.module.scss'

Modal.setAppElement('#__next')

export default function Header() {
  const router = useRouter()
  const categories = useSelector(getCategories)
  const [modalIsOpen, setIsOpen] = useState(false)
  const params = queryString.parseUrl(router.asPath).query

  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a className={s.logo}>Butterfly</a>
      </Link>
      <div className={s.nav}>
        <nav>
          <ul className={cn(s.row, s.mobUpper)}>
            {categories.map(
              category =>
                category && (
                  <li key={category}>
                    <Link
                      href={{
                        pathname: `/${category}`,
                        query: params,
                      }}
                    >
                      <a
                        className={cn(s.link, {
                          [s.active]: `'/' + ${router.query.category}` === routes.categories[category],
                        })}
                      >
                        <b>{language[category]}</b>
                      </a>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </nav>

        <ul className={s.row}>
          <li>
            <Button handleClick={() => ({})} ariaLabel={language.save} src="/icons/heart.svg" />
          </li>
          <li className={s.menuBtn}>
            <Button
              ariaLabel={language.menu}
              src={modalIsOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              handleClick={() => setIsOpen(!modalIsOpen)}
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
        <Menu setIsOpen={() => setIsOpen(false)} />
      </Modal>
    </header>
  )
}
