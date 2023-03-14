import React from 'react'
import api from '../src/api'
import { REVALIDATE } from '../src/constants'
import { dispatchData } from '../src/helpers'
import HandMade from '../src/pages/handMadePage'
import { wrapper } from '../src/redux/store'

export default function handMade() {
  return <HandMade />
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
