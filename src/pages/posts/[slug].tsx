import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Box, Heading } from '@chakra-ui/react'
import Container from '../../components/Container'
import supabase from '../../lib/supabase'
import PostContent from '../../components/Post/Content'

type Post = {
  slug: string
  title: string
  content: string
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <Box>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container flexDir="column" gap={6}>
        <Heading>{post.title}</Heading>

        <Box as="main">
          <PostContent content={post.content} />
        </Box>
      </Container>
    </Box>
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
