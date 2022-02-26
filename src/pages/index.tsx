import * as React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { getPosts, type Post } from 'utils/post'

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container-lg space-y-10 px-4 pt-8">
        <div className="flex flex-col space-y-3 text-center font-serif md:space-y-4">
          <h2 className="text-3xl md:text-5xl">
            Welcome to `
            <span className="bg-gradient-to-br from-pink-500 via-orange-500 to-yellow-500 bg-clip-text font-semibold text-transparent dark:from-pink-500 dark:via-orange-500 dark:to-yellow-500">
              Snippets
            </span>
            `
          </h2>
          <span className="text-sm font-light text-moon-500 dark:text-moon-300 md:text-lg">
            Check out some of the great articles the community have written below.
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {posts.map(post => (
            <li
              key={post.slug}
              className="flex rounded p-4 shadow-lg transition-shadow active:shadow-xl dark:bg-moon-700 dark:hover:shadow-black dark:active:shadow-moon-900 lg:hover:shadow-xl"
            >
              <Link href={post.slug}>
                <a className="flex flex-1 flex-col">
                  {post.title}

                  <span className="mt-8 text-sm dark:text-moon-400"># {post.slug}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      posts: await getPosts(),
    },
  }
}

export default Home
