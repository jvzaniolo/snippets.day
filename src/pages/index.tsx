import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Box, Grid, Heading, Stack } from '@chakra-ui/react'
import PostLink from '../components/Post/Link'
import supabase from '../lib/supabase'

type Post = {
  id: number
  slug: string
  title: string
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <Box>
      <Head>
        <title>Dev Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack as="main" maxW="container.lg" mx="auto" spacing={4}>
        <Heading size="md">Welcome to my Dev blog</Heading>

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {posts.map(post => (
            <PostLink key={post.id} post={post} />
          ))}
        </Grid>
      </Stack>
    </Box>
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
