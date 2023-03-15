import React, { useState } from 'react'
import AdminLogin from '../../components/admin/AdminLogin'
import { IonSubmit } from '../../components/admin/AdminLogin/AdminLogin'
import AdminPanel from '../../components/admin/AdminPanel'
import Layout from '../../components/Layout'
import { Request } from '../../interfaces'
import api from '../../api/api'

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [status, setStatus] = useState<Request>()
  const [loading, setLoading] = useState(false)

  const handleSubmit: IonSubmit = async body => {
    setLoading(true)
    console.log(body)

    try {
      const res = await api.adminLogin(body)

      if (res.data?.auth) {
        setStatus('Success')
        setIsAuth(true)
      }
    } catch (error) {
      console.warn(error)
      setStatus('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {isAuth ? <AdminPanel /> : <AdminLogin onSubmit={handleSubmit} isLoading={loading} status={status} />}
    </Layout>
  )
}
