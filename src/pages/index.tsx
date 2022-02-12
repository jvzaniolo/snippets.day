import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import PostLink from '../components/Post/Link'
import supabase from '../lib/supabase'
import Container from '../components/Container'

type Post = {
  id: number
  slug: string
  title: string
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <Box as="main">
      <Head>
        <title>Dev Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container flexDir={'column'} gap={6}>
        <Flex flexDir={'column'} align="center">
          <Heading size="md">Welcome to Dev Blog!</Heading>
          <Text>Check out some of the great articles the community have written below.</Text>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {posts.map(post => (
            <PostLink key={post.id} post={post} />
          ))}
        </Grid>
      </Container>
    </Box>
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
