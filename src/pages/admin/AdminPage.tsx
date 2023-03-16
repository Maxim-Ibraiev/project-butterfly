import React from 'react'
import AdminPanel from '../../components/admin/AdminPanel'
import Layout from '../../components/Layout'
import { IAdmin } from '../../interfaces'

interface IProps {
  admin: IAdmin
}

export default function AdminPage({ admin }: IProps) {
  return (
    <Layout>
      <AdminPanel admin={admin} />
    </Layout>
  )
}
