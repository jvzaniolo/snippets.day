import { FiGithub } from 'react-icons/fi';
import { type ActionFunction, useActionData, redirect, json } from 'remix';
import supabase from '~/services/supabase';

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();

//   const { error } = await supabase.auth.signIn({
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   });

//   if (error) {
//     return json({ error });
//   }

//   return redirect('/');
// };

export default function Login() {
  // const actionData = useActionData();

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      {/* {actionData?.error && (
        <div className="text-red-600 text-center">{actionData.error.message}</div>
      )} */}

      <form
        action="/login"
        method="post"
        className="mx-auto flex w-full max-w-sm flex-col space-y-4 rounded-lg bg-white p-6 shadow-2xl dark:bg-moon-900 dark:shadow-black"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="dark:text-moon-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-800 dark:text-moon-100 dark:placeholder:text-moon-500"
          />
          <span className="text-sm text-red-400 dark:text-red-300">Email is required.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="dark:text-moon-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-800 dark:text-moon-100 dark:placeholder:text-moon-500"
          />
          <span className="text-sm text-red-400 dark:text-red-300">Password is required.</span>
        </div>

        <button type="submit" className="button primary !mt-10 py-2 text-lg">
          Login
        </button>

        <div className="flex items-center space-x-6">
          <hr className="w-full dark:border-moon-600 dark:bg-moon-600 dark:text-moon-600" />
          <span className="dark:text-moon-300">OR</span>
          <hr className="w-full dark:border-moon-600 dark:bg-moon-600 dark:text-moon-600" />
        </div>

        <button
          type="button"
          onClick={() => supabase.auth.signIn({ provider: 'github' })}
          className="flex items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
        >
          <FiGithub />
          Github
        </button>
      </form>
    </div>
  );
}
