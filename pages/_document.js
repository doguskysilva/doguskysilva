import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from './../_components/header'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
        <body className="bg-blueGray-800 text-white">
          <div className="w-full h-screen grid grid-cols-1 md:grid-cols-3 gap-0">
            <Header/>
            <main className="cols-span-1 md:col-span-2 overflow-y-auto p-3 md:p-6 text-base">
              <Main/>
            </main>
          </div>
          <NextScript />
        </body>
      </Html>
    )
  }
}