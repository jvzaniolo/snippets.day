import supabase from '~/services/supabase';
import { marked } from 'marked';

export type Post = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  html: string;
  profile: {
    name: string;
  };
  content: string;
};

export async function getPosts(query = '*') {
  const { data: posts } = await supabase.from('post').select(query);

  return posts;
}

export async function getPost(slug: string | undefined) {
  const { data: post } = await supabase.from('post').select('*').eq('slug', slug).single();

  const html = marked(post.content, {
    langPrefix: 'hljs lang-',
    highlight: (code, lang) => require('highlight.js').highlight(code, { language: lang }).value,
  });

  return {
    ...post,
    html,
  };
}
