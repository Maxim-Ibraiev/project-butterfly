import React from 'react'
import classNames from 'classnames'
import language from '../../language'
import { UAH } from '../../constants'
import { useSelectedProducts } from '../../customHook'
import s from './ShoppingBagFooter.module.scss'

interface IProps {
  className?: string
}

const ShoppingBagFooter: React.FC<IProps> = ({ className, children }) => {
  const [selectedProducts] = useSelectedProducts()

  return (
    <div className={classNames(s.footer, { [className]: className })}>
      <div className={s.totalContainer}>
        <span className={s.totalTitle}>{language.orderResults}</span>
        <div className={s.totalItem}>
          <span>{language.total}</span>
          <span>
            {selectedProducts.reduce((acc, el) => acc + el.getPrice(), 0)} {UAH}
          </span>
        </div>
      </div>
      {children && <div className={s.footerBottoms}>{children}</div>}
    </div>
  )
}

export default ShoppingBagFooter
