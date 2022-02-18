import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import supabase from '../../lib/supabase'
import PostContent from '../../components/Post/Content'

type Post = {
  slug: string
  title: string
  content: string
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{post.title}</h1>

      <main>
        <PostContent content={post.content} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string

  const { data: post, error } = await supabase
    .from<Post>('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return {
    props: {
      post,
    },
  }
}

export default Post
