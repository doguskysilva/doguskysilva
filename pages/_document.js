import Document, { Html, Head, Main, NextScript } from 'next/document'
import Layout from '../_components/layout'
import Navbar from '../_components/navbar'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='favicon.ico' />
        </Head>
        <body className='bg-blue-500'>
          <Main/>  
          <NextScript />
        </body>
      </Html>
    )
  }
}