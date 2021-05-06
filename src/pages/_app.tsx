import Head from 'next/head'
import GlobalStyles from "../styles/GlobalStyles"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AppProps } from 'next/dist/next-server/lib/router/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (    
    <>
      <GlobalStyles />
      <Head>
        <title>Sons of Aiur | Azralon-US</title>
      </Head>
      <main>
        <Component {...pageProps}/>
      </main>
    </>
  )
}

export default MyApp