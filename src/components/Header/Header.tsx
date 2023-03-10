import React, { useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import ReactModal from 'react-modal'
import { useReduceSelectors } from '../../customHook'
import language from '../../language'
import Button from '../buttons/HederBtn'
import Menu from '../MenuMob'
import ShoppingBag from '../ShoppingBag'
import routes from '../../routes'
import s from './Header.module.scss'

export default function Header() {
  const router = useRouter()
  const { categories } = useReduceSelectors()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpenShoppingBag, setIsOpenShoppingBag] = useState(false)
  const params = queryString.parseUrl(router.asPath).query

  return (
    <header className={s.header}>
      <Link href={routes.home}>
        <a className={s.logo}>Butterfly</a>
      </Link>
      <div className={s.nav}>
        <nav>
          <ul className={cn(s.row, s.mobUpper)}>
            {categories.map(category => (
              <li key={category} className={s.navItem}>
                <Link
                  href={{
                    pathname: routes[category],
                    query: params,
                  }}
                >
                  <a
                    className={cn(s.link, {
                      [s.active]: router.query.globalCategory === category,
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
              handleClick={() => {
                setIsOpenShoppingBag(true)
              }}
              ariaLabel={language.save}
              src="/icons/bag.svg"
            />
          </li>
          <li className={s.menuBtn}>
            <Button
              ariaLabel={language.menu}
              src={isMenuOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              handleClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </li>
        </ul>
      </div>

      <ReactModal
        isOpen={isMenuOpen}
        className={s.modal}
        overlayClassName={s.overModal}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <Menu setIsOpen={() => setIsMenuOpen(false)} />
      </ReactModal>

      <ReactModal
        isOpen={isOpenShoppingBag}
        className={cn(s.modal, s.shoppingBag)}
        overlayClassName={s.overModal}
        onRequestClose={() => setIsOpenShoppingBag(false)}
      >
        <ShoppingBag handleCloseModal={() => setIsOpenShoppingBag(false)} />
      </ReactModal>
    </header>
  )
}
