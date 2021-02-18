import Head from 'next/head'
import Link from 'next/link'
import { getAllTags } from '../lib/api'

function Tags({tags}) {
  return (
    <>
      <Head>
        <title>Tags | doguskysilva</title>
      </Head>
      <div className="px-6">
        <div className="flex pt-28 flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
          <div class="pt-6 pb-8 space-x-2 md:space-y-5">
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
    </>
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