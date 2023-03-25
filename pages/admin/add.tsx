import React from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import getConfig from 'next/config'
import api from '../../src/api/serverApi'
import { dispatchData } from '../../src/helpers'
import AdminAddPage from '../../src/pages/admin/AdminAddPage'
import { wrapper } from '../../src/redux/store'
import routes from '../../src/routes'

export default function AdminAdd() {
  return <AdminAddPage />
}

const { sessionOptions } = getConfig().serverRuntimeConfig

export const getServerSideProps = wrapper.getServerSideProps(store =>
  withIronSessionSsr(async ({ req }) => {
    const admin = req.session?.admin

    if (!admin) {
      return {
        redirect: {
          destination: routes.admin.auth,
          statusCode: 303,
        },
      }
    }

    const data = {
      products: await api.getProducts(),
    }

    dispatchData(store.dispatch, data)

    return {
      props: {
        admin,
      },
    }
  }, sessionOptions)
)
