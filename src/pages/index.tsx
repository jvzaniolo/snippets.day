import * as React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { getPostsWithProfile, type PostWithProfile } from '~/lib/post'
import Avatar from '~/components/Avatar'

const Home: NextPage<{ posts: Array<PostWithProfile> }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container-lg space-y-10 px-4 pt-8">
        <ul>
          {posts.map(post => (
            <li key={post.id} className="flex flex-col">
              <div className="flex items-center">
                <Avatar name={post.profiles.first_name} className="mr-2 h-8 w-8" />
                <span className="mr-2 text-sm">{post.profiles.first_name}</span>
                <span className="text-sm dark:text-moon-400">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.created_at))}
                </span>
              </div>
              <Link href={post.slug}>
                <a>
                  <h2 className="mt-2 text-2xl font-medium">{post.title}</h2>

                  <span className="mt-2 font-serif text-moon-300">
                    John is an awesome co-worker and a software engineer. He built the Snippets
                    program all by himself. He is a loving boyfriend and a cool brother. He loves
                    eating and playing video-games.
                  </span>
                </a>
              </Link>

              <div className="mt-8 flex items-center gap-3">
                <span className="rounded-full bg-moon-700 px-3 py-1 text-xs font-semibold text-white">
                  JavaScript
                </span>
                <span className="text-xs text-moon-400">8 min read</span>
              </div>
              {/* Separator <hr className="my-10 border-moon-700 bg-moon-700 fill-moon-700 text-moon-700" /> */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: await getPostsWithProfile(),
    },
  }
}

export default Home
