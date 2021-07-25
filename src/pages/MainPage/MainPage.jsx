import Layout from '../../components/Layout'
import Category from '../../components/Category'

export default function MainPage({ products, categories }) {
  return (
    <Layout categories={categories}>
      <Category products={products} />
    </Layout>
  )
}
