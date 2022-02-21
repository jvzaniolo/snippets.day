import * as React from 'react'
import Link from 'next/link'

type Post = {
  id: number
  slug: string
  title: string
}

const PostLink = ({ post }: { post: Post }) => {
  return (
    <Link href={post.slug}>
      <a className="flex flex-col rounded bg-white p-4 shadow transition-shadow hover:shadow-lg dark:bg-moon-700 hover:dark:shadow-moon-900">
        <span className="mb-6 font-serif text-xl">{post.title}</span>
        <span className="font-sans text-sm text-moon-500 dark:text-moon-400"># {post.slug}</span>
      </a>
    </Link>
  )
}

export default PostLink
