import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainPage from '../src/pages/MainPage'
import api from '../src/api'
import {
  categoriesSuccess,
  categoriesError,
} from '../src/redux/main/mainActions'

export default function Home({ categories, error }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!error && categories) dispatch(categoriesSuccess(categories))
    if (error) dispatch(categoriesError(error))
  })

  return <MainPage />
}

export async function getStaticProps() {
  const data = await api.getCategories()

  return {
    props: data,
  }
}
