import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Modal from 'react-modal'
import queryString from 'query-string'
import cn from 'classnames'
import Menu from '../MenuMob'
import Button from '../buttons/HederBtn'
import { getCategories } from '../../redux/selectors'
import routes from '../../routes'
import language from '../../language'
import s from './Header.module.scss'
import { Categories } from '../../interfaces'

Modal.setAppElement('#__next')

interface Props {
  categories: Categories
}

export default function Header({ categories }: Props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const categoriesFromStorage = useSelector(getCategories)
  const data = categories || categoriesFromStorage
  const params = queryString.parseUrl(router.asPath).query

  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a className={s.logo}>Butterfly</a>
      </Link>
      <div className={s.nav}>
        <nav>
          <ul className={cn(s.row, s.mobUpper)}>
            {data.map(
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
        <Menu setIsOpen={setIsOpen} />
      </Modal>
    </header>
  )
}
