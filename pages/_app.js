import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'; // add bootstrap css
import '../src/styles/globals.css';
import { Provider } from 'react-redux';
import { useStore } from '../src/redux/store';

function MyApp({ Component, pageProps }) {
  <Head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>;
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
