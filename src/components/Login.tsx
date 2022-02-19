import * as React from 'react'
import supabase from '../lib/supabase'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await supabase.auth.signIn({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2>Welcome to our Dev blog!</h2>

      <div className="flex flex-col">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>

      <div className="flex items-center space-x-6">
        <hr className="w-full border-neutral-600 bg-neutral-600 text-neutral-600" />
        <span className="text-neutral-300">OR</span>
        <hr className="w-full border-neutral-600 bg-neutral-600 text-neutral-600" />
      </div>

      <button>Github</button>
    </form>
  )
}

export default Login
