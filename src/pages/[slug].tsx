import Markdown from 'marked-react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as React from 'react'
import SyntaxHighlighter from '~/components/SyntaxHighlighter'
import supabase from '~/services/supabase'

type Post = {
  slug: string
  title: string
  cover: {
    src: string
    blurData: string
  }
  content: string
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <div className="h-full">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-lg mt-10 px-4 lg:flex">
        <main className="flex-1">
          {post.cover && (
            <div className="relative w-full object-cover lg:h-96">
              <Image
                src={post.cover.src}
                alt="Article's cover"
                placeholder="blur"
                layout="fill"
                blurDataURL={post.cover.blurData}
                priority
              />
            </div>
          )}

          <h1 className="mb-10 font-serif text-3xl md:text-4xl lg:text-5xl">{post.title}</h1>

          <article className="post-content">
            <Markdown
              value={post.content}
              renderer={{
                code: (snippet, lang) => <SyntaxHighlighter snippet={snippet} lang={lang} />,
              }}
            />
          </article>
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug

  const { data: post } = await supabase.from('post').select('*').eq('slug', slug).single()

  return {
    props: {
      post,
    },
  }
}

export default Post
