import * as React from 'react'
import Link from 'next/link'
import supabase from '../lib/supabase'
import useSession from '../hooks/useSession'
import useTheme from '../hooks/useTheme'

const Header = () => {
  const session = useSession()
  const { toggleTheme } = useTheme()

  return (
    <div>
      <div>
        <Link href="/" passHref>
          <a>🚀 Dev Blog</a>
        </Link>

        <div>
          <button type="button" aria-label="Toggle theme" onClick={toggleTheme}>
            Toggle theme
          </button>

          {session?.user ? (
            <button onClick={() => supabase.auth.signOut()}>Logout</button>
          ) : (
            <Link href="/login" passHref>
              <a>Login</a>
            </Link>
          )}

          <Link href="/sign-up" passHref>
            <button>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
