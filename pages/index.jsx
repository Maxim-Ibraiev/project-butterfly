import { useDispatch, useSelector } from 'react-redux'
import MainPage from '../src/pages/MainPage'
import api from '../src/api'
import { categoriesSuccess } from '../src/redux/main/mainActions'

export default function Home({ categories }) {
  const dispatch = useDispatch()
  const getCategories = useSelector(state => state.main.categories)

  return (
    <>
      {categories && (
        <ul>
          {categories.map(el => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      )}
      <button onClick={() => dispatch(categoriesSuccess(categories))}>X</button>
      <MainPage />
      {/* <div>test</div> */}
    </>
  )
}

export async function getStaticProps() {
  const categories = await api.getCategories()

  return {
    props: { categories },
  }
}
