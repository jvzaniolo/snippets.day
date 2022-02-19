import { useRouter } from 'next/router'
import * as React from 'react'
import { FiGithub } from 'react-icons/fi'
import supabase from '../lib/supabase'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { user } = await supabase.auth.signIn({ email, password })

    if (user) {
      router.back()
    }
  }

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Thanks for joining in 😊</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-sm flex-col space-y-4 rounded-lg p-6 shadow-2xl dark:shadow-neutral-900"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="dark:text-neutral-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded p-2 outline-indigo-500 focus:outline focus:outline-2 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="dark:text-neutral-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded p-2 outline-indigo-500 focus:outline focus:outline-2 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </div>

        <button type="submit" className="button-primary !mt-10 !py-2.5 text-lg">
          Login
        </button>

        <div className="flex items-center space-x-6">
          <hr className="w-full dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-600" />
          <span className="dark:text-neutral-300">OR</span>
          <hr className="w-full dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-600" />
        </div>

        <button
          onClick={() => supabase.auth.signIn({ provider: 'github' })}
          className="button flex items-center justify-center gap-4 bg-black !py-2.5 text-lg text-white hover:!text-white"
        >
          <FiGithub />
          Github
        </button>
      </form>
    </div>
  )
}

export default Login
