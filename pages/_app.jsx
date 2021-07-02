/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from '../src/redux/store'
import 'bootstrap/dist/css/bootstrap.css' // add bootstrap css
import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      {process.browser ? (
        <Provider store={store._store}>
          <PersistGate persistor={store.persistor}>
            <Head>
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Playball&display=swap"
                rel="stylesheet"
              />
            </Head>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default MyApp
