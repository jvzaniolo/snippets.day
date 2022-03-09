import supabase from '~/services/supabase';
import { marked } from 'marked';

export type Post = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  html: string;
  profile: {
    first_name: string;
    last_name: string;
  };
  content: string;
};

export async function getPosts(query = '*') {
  const { data: posts } = await supabase.from('post').select(query);

  return posts;
}

export async function getPost(slug: string | undefined) {
  const { data: post } = await supabase.from('post').select('*').eq('slug', slug).single();

  const html = marked.parse(post.content);

  return {
    ...post,
    html,
  };
}
