import type { GetStaticProps, NextPage } from 'next'
import type { PostgrestResponse } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
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

      <main className="text-center">
        <h1 className="text-3xl">Welcome to my Dev blog</h1>

        <section className="mt-10">
          {posts.map(post => (
            <div key={post.id} className="underline">
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts }: PostgrestResponse<Post> = await supabase
    .from('posts')
    .select('*')

  return {
    props: {
      posts,
    },
  }
}

export default Home
