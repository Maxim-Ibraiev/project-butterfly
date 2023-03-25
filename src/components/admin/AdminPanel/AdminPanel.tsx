import React from 'react'
import { useRouter } from 'next/router'
import { IAdmin } from '../../../interfaces'
import language from '../../../language'
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
        logout
      </Chip>
    </div>
  )
}
