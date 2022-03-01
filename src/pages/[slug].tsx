import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { marked } from 'marked'
import supabase from '~/services/supabase'

type Post = {
  slug: string
  title: string
  cover: {
    src: string
    blurData: string
  }
  html: string
  content: string
}

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <div className="h-full">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-lg p-4 !pt-0 !pb-10 md:p-6 lg:flex lg:gap-8">
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

          <h1 className="my-8 font-serif text-3xl md:my-10 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug

  const { data: post } = await supabase.from('post').select('*').eq('slug', slug).single()

  const html = marked(post?.content)

  return {
    props: {
      post: { ...post, html },
    },
  }
}

export default Post
