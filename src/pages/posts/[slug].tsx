import type { GetServerSideProps, NextPage } from 'next'

import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

import supabase from '../../lib/supabase'

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

      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark}
                showLineNumbers
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
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
