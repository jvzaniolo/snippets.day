import * as React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Avatar from '~/components/Avatar'
import supabase from '~/services/supabase'

type Post = {
  id: string
  slug: string
  title: string
  created_at: string
  profile: {
    first_name: string
    last_name: string
  }
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container-lg space-y-10">
        <ul>
          {posts.map(post => (
            <li key={post.id} className="flex flex-col">
              <div className="flex items-center">
                <Avatar
                  firstName={post.profile.first_name}
                  lastName={post.profile.last_name}
                  className="mr-2 h-8 w-8"
                />
                <span className="mr-2 text-sm">{post.profile.first_name}</span>
                <span className="text-sm text-moon-500 dark:text-moon-400">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.created_at))}
                </span>
              </div>
              <Link href={post.slug}>
                <a className="flex flex-col">
                  <h2 className="mt-2 text-2xl font-medium">{post.title}</h2>

                  <span className="mt-2 font-serif text-moon-600 dark:text-moon-300">
                    John is an awesome co-worker and a software engineer. He built the Snippets
                    program all by himself. He is a loving boyfriend and a cool brother. He loves
                    eating and playing video-games.
                  </span>
                </a>
              </Link>

              <div className="mt-8 flex items-center gap-3">
                <span className="rounded-full bg-moon-200 px-3 py-1 text-xs font-semibold dark:bg-moon-700 dark:text-white">
                  JavaScript
                </span>
                <span className="text-xs text-moon-500 dark:text-moon-400">8 min read</span>
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
  let { data: posts } = await supabase.from('post').select('*,profile(*)')

  return {
    props: {
      posts,
    },
  }
}

export default Home
