import React from 'react'
import { useRouter } from 'next/router'
import { useFilter, useReduceSelectors } from '../../../customHook'
import { IAdmin } from '../../../interfaces'
import language from '../../../language'
import Chip from '../../buttons/Chip'
import CardList from '../../CardList'
import Filter from '../../filters/Filter'
import Text from '../../Text'
import api from '../../../api/api'
import routes from '../../../routes'

interface IProps {
  admin: IAdmin
}

export default function AdminPanel({ admin }: IProps) {
  const router = useRouter()
  const { getQueryProducts } = useFilter()
  const { products } = useReduceSelectors()
  const filteredProdutcts = getQueryProducts(products)

  return (
    <div>
      <div>
        <Chip onClick={() => router.push(routes.admin.add)}>{language.addProduct}</Chip>

        <Chip
          style={{
            position: 'absolute',
            right: '10px',
            top: '0px',
          }}
          type="button"
          onClick={async () => {
            await api.adminLogout()
            router.push(routes.admin.auth)
          }}
        >
          Вийти
        </Chip>
      </div>

      <Text type="header" component="h1">
        {language.allFilters}
      </Text>
      <Filter />
      <CardList products={filteredProdutcts} getLinkForProdutc={routes.admin.toEditProduct} />
    </div>
  )
}
