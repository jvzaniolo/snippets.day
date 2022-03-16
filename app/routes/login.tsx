import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiGithub } from 'react-icons/fi';
import type { ApiError } from '@supabase/supabase-js';
import supabaseClient from '~/services/supabase.client';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  let [formError, setFormError] = useState<ApiError | null>(null);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  let onSubmit = handleSubmit(async data => {
    let { email, password } = data;

    let { error } = await supabaseClient.auth.signIn({ email, password });

    setFormError(error);
  });

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      <div className="mx-auto flex w-full max-w-sm flex-col space-y-4 rounded-lg bg-white p-6 shadow-2xl dark:bg-moon-800">
        {formError && <p className="text-red-600">{formError.message}</p>}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="example@email.com"
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="button primary !mt-10 w-full py-2 text-lg"
          >
            Login
          </button>
        </form>

        <div className="!my-4 flex items-center space-x-4">
          <hr className="w-full" />
          <span>OR</span>
          <hr className="w-full" />
        </div>

        <button
          onClick={() => supabaseClient.auth.signIn({ provider: 'github' })}
          className="!mt-0 flex w-full items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
        >
          <FiGithub />
          Github
        </button>
      </div>
    </div>
  );
}
