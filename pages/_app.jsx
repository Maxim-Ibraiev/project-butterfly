/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import { useStore, Provider } from 'react-redux'
import { wrapper } from '../src/redux/store'
import 'bootstrap/dist/css/bootstrap.css' // add bootstrap css
import '../src/styles/globals.css'
import '../src/styles/variables.scss'

function MyApp({ Component, pageProps }) {
  const store = useStore()

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
