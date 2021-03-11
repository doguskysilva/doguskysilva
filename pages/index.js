import Layout from '../_components/layout'
import Head from 'next/head'

const Index = () => (
  <Layout>
    <Head>
      <title>Douglas Silva | dogusky.tech</title>
    </Head>
    <div className='h-full flex flex-wrap content-center px-6 py-3 lg:px-10 lg:py-5 main-background'>
      <div className='w-full'>
        <div className='md:w-2/3'>
          <h1 className='text-6xl'>{'<Douglas Silva />'}</h1>
          <p className='text-xl my-8 text-left'>
            Desenvolvedor de software, apaixonado por programação e agora escrevendo, compartilhando tudo que aprendi e continuo aprendendo
          </p>
        </div>
        
        <div className='flex w-full'>
          <div className='flex-1 bg-violet-900'>
            Ola Mundo
          </div>
          <div className='flex-1 bg-violet-700'>
            Ola Mundo
          </div>
        </div>
      </div>
    </div>
  </Layout>
)



export default Index