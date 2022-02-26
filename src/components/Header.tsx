import * as React from 'react'
import Link from 'next/link'
import { FiSun, FiMoon } from 'react-icons/fi'
import supabase from 'utils/supabase'
import useTheme from 'hooks/useTheme'
import useSession from 'hooks/useSession'
import useThemeValue from 'hooks/useThemeValue'

const Header = () => {
  const session = useSession()
  const { toggleTheme } = useTheme()
  const icon = useThemeValue(<FiMoon />, <FiSun />)

  return (
    <header className="z-20 flex h-12 items-center px-4 py-2 shadow-md dark:bg-moon-700 dark:shadow-xl">
      <div className="container-lg flex justify-between">
        <Link href="/">
          <a className="rounded px-2 py-1 text-lg font-semibold tracking-wide transition-colors active:bg-moon-100 dark:active:bg-moon-600 lg:hover:bg-moon-100 lg:dark:hover:bg-moon-600">
            🚀 Snippets
          </a>
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
