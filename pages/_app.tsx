import type { AppProps } from 'next/app'
import ReactModal from 'react-modal'
import { wrapper } from '../src/redux/store'
import 'bootstrap/dist/css/bootstrap.css' // add bootstrap css
import '../src/styles/globals.css'
import '../src/styles/variables.scss'
/* eslint-disable react/jsx-props-no-spreading */

ReactModal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
