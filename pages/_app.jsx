/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import { useStore, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../src/redux/store'

import 'bootstrap/dist/css/bootstrap.css' // add bootstrap css
import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const store = useStore()

  return process.browser ? (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  ) : (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp)
