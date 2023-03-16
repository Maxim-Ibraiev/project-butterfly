import React from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import getConfig from 'next/config'
import AdminLoginPage from '../../src/pages/admin/AdminLoginPage'
import routes from '../../src/routes'

export default function AdminLogin() {
  return <AdminLoginPage />
}

const { sessionOptions } = getConfig().serverRuntimeConfig

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const admin = req.session?.admin

  if (admin) {
    return {
      redirect: {
        destination: routes.admin,
        statusCode: 303,
      },
    }
  }

  return {
    props: {},
  }
}, sessionOptions)
