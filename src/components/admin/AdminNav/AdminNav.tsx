import React from 'react'
import { useRouter } from 'next/router'
import Chip from '../../buttons/Chip/Chip'
import routes from '../../../routes'
import s from './adminNav.module.scss'

export default function AdminNav() {
  const router = useRouter()

  return (
    <div className={s.container}>
      <Chip onClick={() => router.push(routes.admin.main)} style={{ marginRight: '10px' }}>
        {'<'}
      </Chip>
      {routes.admin.add !== router.route && <Chip onClick={() => router.push(routes.admin.add)}>+</Chip>}
    </div>
  )
}
