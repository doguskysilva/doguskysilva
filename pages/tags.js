import Head from 'next/head'
import Link from 'next/link'
import { getAllTags } from '../lib/api'
import Layout from '../_components/layout'

function Tags({tags}) {
  return (
    <Layout>
      <Head>
        <title>Tags | dogusky.tech</title>
      </Head>
      <div className="px-6">
        <div className="flex flex-col md:flex-row items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:space-x-6 mt-0 md:mt-24">
          <div class="pt-6 pb-8 space-x-2">
            <h1 class="text-4xl text-center font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:leading-14 md:border-r-2 md:px-6">
              Ando escrevendo sobre
            </h1>
          </div>
          <div className="flex flex-wrap max-w-lg">
            {
              Object.entries(tags).map(([key, value]) => (
                <div className="mt-2 mb-2 mr-5 text-base">
                  <Link href={`/tags/${key}`}>
                    <a>
                      <span className="mr-3 font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400">
                        {key}
                      </span>
                      <span className="-ml-2 font-semibold text-gray-600 uppercase dark:text-gray-300">
                        ({value})
                      </span>
                    </a>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>        
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const tags = getAllTags()

   return {
    props: {
      tags: tags
    }
  }
}

export default Tags