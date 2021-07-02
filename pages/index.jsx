import MainPage from '../src/pages/MainPage'
import api from '../src/api'

export default function Home({ categories }) {
  return (
    <>
      {categories && (
        <ul>
          {categories.map(el => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      )}
      <MainPage />
    </>
  )
}

export async function getStaticProps() {
  const categories = await api.getCategories()

  return {
    props: { categories },
  }
}
