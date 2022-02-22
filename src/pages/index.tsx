import * as React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import PostLink from '../components/Post/Link'
import supabase from '../lib/supabase'

type Post = {
  id: number
  slug: string
  title: string
  user_id: string
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container space-y-10 px-4 pt-8">
        <div className="flex flex-col space-y-3 text-center font-serif md:space-y-4">
          <h2 className="text-3xl md:text-5xl">
            Welcome to `
            <span className=" bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 bg-clip-text font-semibold text-transparent dark:from-sky-500 dark:via-indigo-400 dark:to-purple-400">
              Snippets
            </span>
            `
          </h2>
          <span className="text-sm font-light text-moon-500 dark:text-moon-300 md:text-lg">
            Check out some of the great articles the community have written below.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {posts.map(post => (
            <PostLink key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: posts, error } = await supabase
    .from<Post>('posts')
    .select('id, title, slug, created_at')

  if (error) {
    throw new Error(error.message)
  }

  return {
    props: {
      posts: posts,
    },
  }
}

export default Home
