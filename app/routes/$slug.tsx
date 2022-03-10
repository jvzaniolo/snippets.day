import { type LoaderFunction, useLoaderData } from 'remix';
import { getPost, type Post } from '~/utils/post';
import a11yLight from 'highlight.js/styles/a11y-light.css';

export const links = () => {
  return [{ rel: 'stylesheet', href: a11yLight }];
};

export const loader: LoaderFunction = ({ params }) => {
  return getPost(params.slug);
};

export default function PostDetails() {
  const post: Post = useLoaderData();

  return (
    <div className="container-lg mt-10 px-4 lg:flex">
      <main className="mb-20 flex-1">
        <h1 className="mb-10 font-serif text-3xl md:text-4xl lg:text-5xl">{post.title}</h1>

        <article className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>

      <footer>{/* author biography */}</footer>
    </div>
  );
}
