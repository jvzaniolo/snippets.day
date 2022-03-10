import { Link, useLoaderData } from 'remix';
import { getPosts, type Post } from '~/utils/post';
import { readingTime } from '~/utils/read-time';

export const loader = () => {
  return getPosts('*, profile(*)');
};

export default function Index() {
  const posts: Post[] = useLoaderData();

  return (
    <main className="container-lg mt-10 space-y-10">
      <ul>
        {posts.map(post => (
          <>
            <li
              key={post.id}
              className="flex flex-col rounded-lg border border-transparent p-4 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm">{post.profile.name}</span>
                <span className="text-moon-500">&bull;</span>
                <span className="text-xs text-moon-500 md:text-sm">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.created_at))}
                </span>
              </div>

              <Link className="flex flex-col" to={post.slug}>
                <h2 className="mt-2 text-xl font-medium md:text-2xl">{post.title}</h2>

                <span className="mt-2 font-serif text-sm text-moon-600 md:text-base">
                  {post.preview}
                </span>
              </Link>

              <div className="mt-8 flex items-center gap-3">
                <span className="text-xs text-moon-500">{readingTime(post.content)}</span>
              </div>
            </li>
            {/* <hr className="my-4 border-moon-200 bg-moon-200 fill-moon-200 text-moon-200" /> */}
          </>
        ))}
      </ul>
    </main>
  );
}
