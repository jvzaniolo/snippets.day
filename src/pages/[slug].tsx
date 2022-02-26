import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPost, type Post } from 'utils/post'

const Post: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <div className="h-full overflow-y-auto">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-lg mx-auto p-4 !pt-0 !pb-10 md:p-6 lg:flex lg:gap-8">
        <main className="flex-1">
          {post.cover && (
            <Image
              src={post.cover}
              alt="Article's cover"
              loading="lazy"
              width="100%"
              height={500}
            />
          )}

          <h1 className="my-8 font-serif text-3xl md:my-10 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <section className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </main>
        <nav className="sticky top-8 hidden h-min w-48 rounded border p-4 pl-9 dark:border-moon-600 lg:block">
          <ol className="list-decimal">
            {post.nav?.map(link => (
              <li key={link.id} className="text-orange-300 underline-offset-1 hover:underline">
                <a href={`#${link.id}`}>{link.content}</a>
              </li>
            ))}
          </ol>
        </nav>
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
