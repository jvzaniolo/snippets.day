import supabase from '~/services/supabase';

export type Post = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  profile: {
    first_name: string;
    last_name: string;
  };
};

export async function getPosts(query = '*') {
  const { data: posts } = await supabase.from('post').select(query);

  return posts;
}
