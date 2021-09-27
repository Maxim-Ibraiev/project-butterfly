import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import MainProduct from '../../components/MainProduct'
import NotFoundProduct from '../../components/NotFoundProduct'
import { IProduct, IState } from '../../interfaces'
import { getProductById } from '../../redux/selectors'

export default function ProductPage() {
  const router = useRouter()
  const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
  const product = useSelector<IState, IProduct>(state => getProductById(state, idProduct))

  return <Layout>{product ? <MainProduct /> : <NotFoundProduct />}</Layout>
}
