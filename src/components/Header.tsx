import * as React from 'react'
import Link from 'next/link'
import { FiSun, FiMoon } from 'react-icons/fi'
import supabase from '~/lib/supabase'
import useTheme from '~/hooks/useTheme'
import useSession from '~/hooks/useSession'
import useThemeValue from '~/hooks/useThemeValue'

const Header = () => {
  const session = useSession()
  const { toggleTheme } = useTheme()
  const icon = useThemeValue(<FiMoon />, <FiSun />)

  return (
    <header className="z-20 flex h-14 items-center bg-moon-50 px-4 py-2 shadow-md dark:bg-moon-800 dark:shadow-xl">
      <div className="container-lg flex justify-between">
        <Link href="/">
          <a className="button-ghost px-2 py-1 text-lg font-medium tracking-wide">🚀 Snippets</a>
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="button-ghost h-9 w-9"
          >
            {icon}
          </button>

          {session?.user ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="button-primary ml-2 h-9 px-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" passHref>
                <a className="button-ghost h-9 px-3">Login</a>
              </Link>

              <Link href="/sign-up" passHref>
                <button className="button-primary ml-2 h-9 px-2">Create Account</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
