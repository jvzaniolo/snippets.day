import { Link, useLoaderData } from 'remix';
import { getPosts, type Post } from '~/utils/post';

export const loader = () => {
  return getPosts('*, profile(*)');
};

export default function Index() {
  const posts: Post[] = useLoaderData();

  return (
    <div>
      <main className="container-lg mt-10 space-y-10">
        <ul>
          {posts.map(post => (
            <li key={post.id} className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 text-sm">{post.profile.name}</span>
                <span className="text-sm text-moon-500 dark:text-moon-400">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.created_at))}
                </span>
              </div>

              <Link className="flex flex-col" to={post.slug}>
                <h2 className="mt-2 text-2xl font-medium">{post.title}</h2>

                <span className="mt-2 font-serif text-moon-600 dark:text-moon-300">
                  John is an awesome co-worker and a software engineer. He built the Snippets
                  program all by himself. He is a loving boyfriend and a cool brother. He loves
                  eating and playing video-games.
                </span>
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
  );
}
