import Layout from '../_components/layout'
import Head from 'next/head'

const Index = () => (
  <Layout>
    <Head>
      <title>Douglas Silva | dogusky.tech</title>
    </Head>
    <div className='h-full flex flex-wrap content-center px-6 py-3 lg:px-10 lg:py-5 main-background'>
      <div className='md:w-2/3'>
        <h1 className='text-6xl'>Douglas Silva</h1>
        <p className='text-xl my-8 text-left'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut doloribus, exercitationem laborum impedit nulla sapiente inventore, perferendis eos quia asperiores nam.
        </p>
        <button>
          Leia Mais
        </button>
      </div>
    </div>
  </Layout>
)

export default Index