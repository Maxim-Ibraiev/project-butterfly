import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'; // add bootstrap css

import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
