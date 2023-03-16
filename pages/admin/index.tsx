import { withIronSessionSsr } from 'iron-session/next'
import getConfig from 'next/config'
import { IAdmin } from '../../src/interfaces'
import AdminPage from '../../src/pages/admin/AdminPage'
import routes from '../../src/routes'

interface IProps {
  admin: IAdmin
}

export default function Admin({ admin }: IProps) {
  return <AdminPage admin={admin} />
}

const { sessionOptions } = getConfig().serverRuntimeConfig

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const admin = req.session?.admin

  if (!admin) {
    return {
      redirect: {
        destination: routes.adminAuth,
        statusCode: 303,
      },
    }
  }

  return {
    props: {
      admin,
    },
  }
}, sessionOptions)
