import * as React from 'react'
import Link from 'next/link'
import supabase from '../lib/supabase'
import useSession from '../hooks/useSession'
import useTheme from '../hooks/useTheme'
import useThemeValue from '../hooks/useThemeValue'
import { FiSun, FiMoon } from 'react-icons/fi'

const Header = () => {
  const session = useSession()
  const { toggleTheme } = useTheme()
  const icon = useThemeValue(<FiMoon />, <FiSun />)

  return (
    <header className="bg-moon-50 px-4 py-2 shadow-md dark:bg-moon-700">
      <div className="container flex justify-between">
        <Link href="/" passHref>
          <a className="button text-lg">🚀 Snippets</a>
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="button !py-2.5"
          >
            {icon}
          </button>

          {session?.user ? (
            <button onClick={() => supabase.auth.signOut()} className="button-primary ml-3">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" passHref>
                <a className="button ml-1">Login</a>
              </Link>

              <Link href="/sign-up" passHref>
                <button className="button-primary ml-3">Create Account</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
