import Layout from '../../components/Layout'
import Category from '../../components/Category'
import { IProduct, Categories } from '../../interfaces'

type Props = {
  // products: IProduct
  categories: Categories
}

export default function MainPage({ categories }: Props) {
  return (
    <Layout categories={categories}>
      <Category />
    </Layout>
  )
}
