import { withIronSessionSsr } from 'iron-session/next'
import getConfig from 'next/config'
import serverApi from '../../src/api/serverApi'
import { dispatchData } from '../../src/helpers'
import { IAdmin } from '../../src/interfaces'
import AdminPage from '../../src/pages/admin/AdminPage'
import { wrapper } from '../../src/redux/store'
import routes from '../../src/routes'

interface IProps {
  admin: IAdmin
}

export default function Admin({ admin }: IProps) {
  return <AdminPage admin={admin} />
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
      products: await serverApi.getProducts(),
    }

    dispatchData(store.dispatch, data)

    return {
      props: {
        admin,
      },
    }
  }, sessionOptions)
)
