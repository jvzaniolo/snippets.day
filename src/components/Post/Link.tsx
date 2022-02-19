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
      <a className="flex flex-col rounded bg-white p-4 shadow transition-shadow hover:shadow-lg dark:bg-neutral-700 hover:dark:shadow-neutral-900">
        <span className="mb-6 font-serif text-xl">{post.title}</span>
        <span className="font-sans text-sm text-neutral-500 dark:text-neutral-400">
          # {post.slug}
        </span>
      </a>
    </Link>
  )
}

export default PostLink
