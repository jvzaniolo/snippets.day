import { PostgrestResponse } from '@supabase/supabase-js'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import supabase from '../lib/supabase'

type Post = {
  id: number
  slug: string
  title: string
  content: string
}

interface PostProps {
  post: Post
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
    .select('id')

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
