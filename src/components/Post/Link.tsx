import * as React from 'react'
import NextLink from 'next/link'

type Post = {
  id: number
  slug: string
  title: string
}

const PostLink = ({ post }: { post: Post }) => {
  return (
    <NextLink href={`/posts/${post.slug}`}>
      <a>{post.title}</a>
    </NextLink>
  )
}

export default PostLink
