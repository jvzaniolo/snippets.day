import type { GetStaticProps, NextPage } from 'next'
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

      <main>
        <h1>Welcome to my Dev blog</h1>

        <section>
          {posts.map(post => (
            <div key={post.id}>
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
