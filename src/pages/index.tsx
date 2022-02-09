import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import supabase from '../lib/supabase'

type Post = {
  id: number
  slug: string
  title: string
  content: string
}

interface HomeProps {
  posts: Array<Post>
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello world</h1>

        {posts.map(post => (
          <div key={post.id}>
            <Link href={post.slug}>
              <a>{post.title}</a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts } = await supabase.from('posts').select('*')

  return {
    props: {
      posts,
    },
  }
}

export default Home
