import * as React from 'react'
import type { NextPage } from 'next'
import supabase from '../lib/supabase'

const SignUp: NextPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await supabase.auth.signUp({ email, password })
  }

  async function signInWithGithub() {
    await supabase.auth.signIn({
      provider: 'github',
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}
      >
        <h2>Create your account here</h2>

        <div>
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

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Confirm password</label>
          <input
            id="confirm-password"
            type="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <hr />

      <button onClick={signInWithGithub} type="button">
        Github
      </button>
    </div>
  )
}

export default SignUp
