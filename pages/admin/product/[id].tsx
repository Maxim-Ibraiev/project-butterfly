import { withIronSessionSsr } from 'iron-session/next'
import getConfig from 'next/config'
import serverApi from '../../../src/api/serverApi'
import { dispatchData } from '../../../src/helpers'
import { IAdmin } from '../../../src/interfaces'
import AdminEditPage from '../../../src/pages/admin/AdminEditPage'
import { wrapper } from '../../../src/redux/store'
import routes from '../../../src/routes'

interface IProps {
  admin: IAdmin
}

export default function Admin({ admin }: IProps) {
  return <AdminEditPage admin={admin} />
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
