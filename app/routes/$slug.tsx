import { type LoaderFunction, useLoaderData, redirect } from 'remix';
import a11yLight from 'highlight.js/styles/a11y-light.css';
import { getPost, type Post } from '~/utils/post';

export const links = () => {
  return [{ rel: 'stylesheet', href: a11yLight }];
};

export const loader: LoaderFunction = ({ params }) => {
  return getPost(params.slug);
};

export default function PostDetails() {
  const post: Post | null = useLoaderData();

  if (!post) return redirect('/');

  return (
    <div className="container-lg lg:flex">
      <main className="mt-10 mb-20 flex-1">
        <img
          src={`https://ihmjgncpquwctrvdmwey.supabase.in/storage/v1/object/public/covers/${post.id}`}
          alt={post.title}
        />

        <h1 className="my-10 font-serif text-3xl md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <article
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
    </div>
  );
}
