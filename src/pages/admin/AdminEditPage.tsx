import React from 'react'
import AdminEdit from '../../components/admin/AdminEdit'
import Layout from '../../components/Layout'
import { IAdmin } from '../../interfaces'

interface IProps {
  admin: IAdmin
}

export default function AdminPage({ admin }: IProps) {
  return (
    <Layout>
      <AdminEdit />
    </Layout>
  )
}
