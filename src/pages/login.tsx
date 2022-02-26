import * as React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FiGithub } from 'react-icons/fi'
import supabase from '~/lib/supabase'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async data => {
    const { email, password } = data

    const { user, error } = await supabase.auth.signUp({ email, password })

    if (user) {
      router.push('/')
    }

    if (error) {
      alert(error)
    } else {
      reset()
    }
  })

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      <form
        onSubmit={onSubmit}
        className="mx-auto flex w-full max-w-sm flex-col space-y-4 rounded-lg p-6 shadow-2xl dark:shadow-moon-800"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="dark:text-moon-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: true })}
            placeholder="email@example.com"
            className="w-full rounded p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700 dark:text-moon-100 dark:placeholder:text-moon-500"
          />
          {errors.email && <span className="text-sm text-red-300">Email is required.</span>}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="dark:text-moon-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password', { required: true })}
            className="w-full rounded p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700 dark:text-moon-100 dark:placeholder:text-moon-500"
          />
          {errors.password && <span className="text-sm text-red-300">Password is required.</span>}
        </div>

        <button type="submit" className="mt-10 py-2.5 text-lg">
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
          className="flex items-center justify-center gap-4 rounded bg-black py-2.5 text-lg text-white transition-transform hover:-translate-y-0.5 "
        >
          <FiGithub />
          Github
        </button>
      </form>
    </div>
  )
}

export default Login
