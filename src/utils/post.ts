import parseFrontMatter from 'front-matter'
import { marked } from 'marked'
import supabase from './supabase'

export type Post = {
  id: string
  slug: string
  title: string
  content: string
  cover: string
  nav: Array<{ id: string; content: string }>
}

export async function getPosts() {
  const { data: posts } = await supabase.from('posts').select('*')

  return posts
}

export async function getPost(slug: string) {
  const { data: post } = await supabase.from<Post>('posts').select('*').eq('slug', slug).single()

  if (!post) throw new Error(`Post not found: ${slug}`)

  // const { data: cover } = await supabase.storage
  //   .from('covers')
  //   .download(post.id);

  const { body } = parseFrontMatter<{ title: string }>(post.content)

  // if (!cover) throw new Error(`Cover not found: ${post.id}`);

  return {
    ...post,
    cover: `https://ihmjgncpquwctrvdmwey.supabase.in/storage/v1/object/public/covers/${post.id}`,
    content: marked(body),
    nav: marked(body)
      .match(/<h1.*/gm)
      ?.map(title => {
        const [, id, content] = new RegExp(/id="(.*)">(.*)</g).exec(title) as Array<string>

        return {
          id,
          content,
        }
      }),
  }
}
