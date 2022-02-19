import * as React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import PostLink from '../components/Post/Link'
import supabase from '../lib/supabase'

type Post = {
  id: number
  slug: string
  title: string
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto max-w-screen-xl space-y-10 px-4 pt-8">
        <div className="flex flex-col space-y-4 text-center font-serif">
          <h2 className="text-5xl">Welcome to `Dev` blog!</h2>
          <span className="text-lg font-light text-neutral-500 dark:text-neutral-300">
            Check out some of the great articles the community have written below.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {posts.map(post => (
            <PostLink key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: posts, error } = await supabase.from<Post>('posts').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return {
    props: {
      posts,
    },
  }
}

export default Home
