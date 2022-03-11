import { Link, useLoaderData } from 'remix';
import { getPosts, type Post } from '~/utils/post';
import readingTime from '~/utils/read-time';

export const loader = () => {
  return getPosts('*, profile(*)');
};

export default function Index() {
  let posts: Post[] | null = useLoaderData();

  return (
    <main className="container-lg mt-10 space-y-10">
      <ul>
        {posts ? (
          posts.map(post => (
            <li
              key={post.id}
              className="flex flex-col rounded-lg border border-transparent p-4 transition-all hover:shadow-lg dark:hover:border dark:hover:bg-moon-800"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm">{post.profile.name}</span>
                <span className="text-moon-500 dark:text-moon-400">&bull;</span>
                <span className="text-xs text-moon-500 dark:text-moon-400 md:text-sm">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.created_at))}
                </span>
              </div>

              <Link className="flex flex-col" to={post.slug}>
                <h2 className="mt-2 text-xl font-medium dark:text-white md:text-2xl">
                  {post.title}
                </h2>

                <span className="mt-2 font-serif text-sm text-moon-600 dark:text-moon-300 md:text-base">
                  {post.preview}
                </span>
              </Link>

              <div className="mt-8 flex items-center gap-3">
                <span className="text-xs text-moon-500 dark:text-moon-400">
                  {readingTime(post.content)}
                </span>
              </div>
              {/* <hr className="my-4 border-moon-200 bg-moon-200 fill-moon-200 text-moon-200" /> */}
            </li>
          ))
        ) : (
          <p className="text-center font-serif font-light italic text-moon-500">
            There are no post here for you to read...
          </p>
        )}
      </ul>
    </main>
  );
}
