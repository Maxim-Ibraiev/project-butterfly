import Layout from '../../components/Layout'
import Category from '../../components/Category'

export default function MainPage({ categories }) {
  return (
    <Layout categories={categories}>
      <Category />
    </Layout>
  )
}
