import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiGithub } from 'react-icons/fi';
import type { ApiError } from '@supabase/supabase-js';
import supabase from '~/services/supabase';

type LoginFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [error, setError] = useState<ApiError | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError: setFormError,
    getValues,
  } = useForm<LoginFormData>();

  const validationSchema = {
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'Password is required',
    },
    confirmPassword: {
      required: 'Confirm password is required',
      validate: (value: string) =>
        value === getValues('password') || 'Passwords do not match',
    },
  };

  const onSubmit = handleSubmit(async data => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      return setFormError('confirmPassword', {
        message: 'Passwords do not match',
      });
    }

    const { error, session } = await supabase.auth.signUp({ email, password });

    if (error) {
      return setError(error);
    }

    console.log(session);
  });

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">
        Thanks for joining
      </h1>

      <div className="mx-auto flex w-full max-w-sm flex-col space-y-4 rounded-lg bg-white p-6 shadow-2xl dark:bg-moon-800">
        {error && (
          <p className="text-red-600 dark:text-red-500">{error.message}</p>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              {...register('email', validationSchema.email)}
              placeholder="example@email.com"
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {formErrors.email && (
              <p className="text-red-600 dark:text-red-500">
                {formErrors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', validationSchema.password)}
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {formErrors.password && (
              <p className="text-red-600 dark:text-red-500">
                {formErrors.password.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', validationSchema.confirmPassword)}
              className="rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700"
            />
            {formErrors.confirmPassword && (
              <p className="text-red-600 dark:text-red-500">
                {formErrors.confirmPassword.message}
              </p>
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
          onClick={() => supabase.auth.signUp({ provider: 'github' })}
          className="!mt-0 flex w-full items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
        >
          <FiGithub />
          Github
        </button>
      </div>
    </div>
  );
}
