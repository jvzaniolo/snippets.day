import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPost, type Post } from '~/lib/post'

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

          <section className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string

  return {
    props: {
      post: await getPost(slug),
    },
  }
}

export default Post
