import React from 'react'
import { useRouter } from 'next/router'
import { IAdmin } from '../../../interfaces'
import Chip from '../../buttons/Chip'
import api from '../../../api/api'
import routes from '../../../routes'

interface IProps {
  admin: IAdmin
}

export default function AdminPanel({ admin }: IProps) {
  const router = useRouter()

  return (
    <div>
      <div>admin: {JSON.stringify(admin.auth)}</div>
      <Chip
        style={{
          position: 'absolute',
          right: '10px',
          top: '70px',
        }}
        type="button"
        onClick={async () => {
          await api.adminLogout()
          router.push(routes.adminAuth)
        }}
      >
        logout
      </Chip>
    </div>
  )
}
