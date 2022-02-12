import * as React from 'react'
import NextLink from 'next/link'
import { GridItem, Link, useColorModeValue } from '@chakra-ui/react'

type Post = {
  id: number
  slug: string
  title: string
}

const PostLink = ({ post }: { post: Post }) => {
  const borderColor = useColorModeValue('gray.300', 'gray.700')

  return (
    <GridItem
      as={NextLink}
      href={`/posts/${post.slug}`}
      passHref
      p="2"
      border="2px"
      rounded="md"
      borderColor={borderColor}
    >
      <Link>{post.title}</Link>
    </GridItem>
  )
}

export default PostLink
