import { Form, json, redirect, useActionData, useTransition } from 'remix';
import type { ActionFunction } from 'remix';
import { FiGithub } from 'react-icons/fi';
import supabase from '~/services/supabase';

type LoginFormData = {
  email: string;
  password: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData) as LoginFormData;
  const { error } = await supabase.auth.api.signInWithEmail(email, password);

  if (error) return json({ error: error.message }, error.status);

  return redirect('/');
};

export default function SignIn() {
  const actionData = useActionData();
  const { state } = useTransition();

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      <div className="mx-auto flex w-full max-w-sm flex-col space-y-4 rounded-lg bg-white p-6 shadow-2xl dark:bg-moon-800">
        {actionData?.error && (
          <p className="text-red-600 dark:text-red-500">{actionData.error}</p>
        )}

        <Form className="space-y-4" method="post">
          <div className="grid gap-2">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {/* {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )} */}
          </div>

          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {/* {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )} */}
          </div>

          <button
            type="submit"
            className="button primary !mt-10 w-full py-2 text-lg"
          >
            {state === 'submitting' ? 'Signing in...' : 'Sign In'}
          </button>
        </Form>

        <div className="!my-4 flex items-center space-x-4">
          <hr className="w-full" />
          <span>OR</span>
          <hr className="w-full" />
        </div>

        <button
          onClick={() => supabase.auth.signIn({ provider: 'github' })}
          className="!mt-0 flex w-full items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
        >
          <FiGithub />
          Github
        </button>
      </div>
    </div>
  );
}
