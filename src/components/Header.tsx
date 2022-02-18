import * as React from 'react'
import Link from 'next/link'
import supabase from '../lib/supabase'
import useSession from '../hooks/useSession'

const Header = () => {
  const session = useSession()

  return (
    <div>
      <div>
        <Link href="/" passHref>
          <a>🚀 Dev Blog</a>
        </Link>

        <div>
          <button type="button" aria-label="Toggle theme">
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
