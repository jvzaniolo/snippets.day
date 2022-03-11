import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import supabase from '~/services/supabase';

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
  preview: string | undefined;
};

export async function getPosts(query = '*'): Promise<Post[] | null> {
  let { data: posts, error } = await supabase.from<Post>('post').select(query);

  if (error) {
    throw new Error(error.message);
  }

  if (posts) {
    return posts.map(post => {
      let html = marked(post.content, {
        sanitizer: unsafe => sanitizeHtml(unsafe),
      });
      let previewRegex = new RegExp(/<(?:p|span)>(.*)<\/(?:p|span)>/g).exec(html);

      return { ...post, html, preview: previewRegex?.[1] };
    });
  }

  return null;
}

export async function getPost(slug: string | undefined): Promise<Post | null> {
  let { data: post, error } = await supabase
    .from<Post>('post')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (post) {
    let html = marked(post.content, {
      langPrefix: 'hljs lang-',
      highlight: (code, lang) => require('highlight.js').highlight(code, { language: lang }).value,
      sanitizer: unsafe => sanitizeHtml(unsafe),
    });

    return { ...post, html };
  }

  return null;
}
