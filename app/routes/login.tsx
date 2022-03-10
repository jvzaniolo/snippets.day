import { FiGithub } from 'react-icons/fi';
import { ActionFunction, useActionData } from 'remix';
import { signIn } from '~/utils/auth';

export const action: ActionFunction = async ({ request }) => {
  return await signIn(await request.formData());
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      {actionData?.error && (
        <div className="text-center text-red-600">{actionData.error.message}</div>
      )}

      <div className="mx-auto flex w-full max-w-sm flex-col rounded-lg bg-white p-6 shadow-2xl">
        <form action="/login" method="post" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2"
            />
          </div>

          <button
            name="_action"
            value="email"
            type="submit"
            className="button primary !mt-10 w-full py-2 text-lg"
          >
            Login
          </button>
        </form>

        <div className="!my-6 flex items-center space-x-6">
          <hr className="w-full" />
          <span>OR</span>
          <hr className="w-full" />
        </div>

        <form method="post">
          <button
            name="_action"
            value="github"
            type="submit"
            className="flex w-full items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
          >
            <FiGithub />
            Github
          </button>
        </form>
      </div>
    </div>
  );
}
