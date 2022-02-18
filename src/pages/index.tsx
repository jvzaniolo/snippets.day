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

      <main>
        <div>
          <h2>Welcome to Dev Blog!</h2>
          <span>Check out some of the great articles the community have written below.</span>
        </div>

        <div>
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
