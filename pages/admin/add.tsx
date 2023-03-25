import React from 'react'
import api from '../../src/api/serverApi'
import { REVALIDATE } from '../../src/constants'
import { dispatchData } from '../../src/helpers'
import AdminAddPage from '../../src/pages/admin/AdminAddPage'
import { wrapper } from '../../src/redux/store'

export default function AdminAdd() {
  return <AdminAddPage />
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const data = {
    products: await api.getProducts(),
  }

  dispatchData(store.dispatch, data)

  return {
    props: {},
    revalidate: REVALIDATE,
  }
})
