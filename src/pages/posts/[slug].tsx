import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { PostgrestResponse } from '@supabase/supabase-js'
import Head from 'next/head'
import supabase from '../../lib/supabase'

type Post = {
  slug: string
  title: string
  content: string
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <div className="text-center">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl">{post.title}</h1>

      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.slug

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts }: PostgrestResponse<Post> = await supabase
    .from('posts')
    .select('*')

  if (!posts) {
    throw new Error('No posts found')
  }

  const paths = posts.map(post => ({
    params: {
      slug: post.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Post
