import * as React from 'react'
import Link from 'next/link'
import { FiSun, FiMoon } from 'react-icons/fi'
import useTheme from '~/hooks/useTheme'
import useSession from '~/hooks/useSession'
import useThemeValue from '~/hooks/useThemeValue'
import Avatar from './Avatar'
import AvatarMenu from './AvatarMenu'

type Profile = {
  firstName: string
  lastName: string
}

const Header = () => {
  const session = useSession()
  const { toggleTheme } = useTheme()
  const icon = useThemeValue(<FiMoon />, <FiSun />)
  const [profile, setProfile] = React.useState<Profile | undefined>(undefined)

  return (
    <header className="bg-white shadow dark:bg-moon-800">
      <div className="container-lg flex items-center justify-between py-3">
        <Link href="/">
          <a className="button">🚀 Snippets</a>
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="button ghost icon"
          >
            {icon}
          </button>

          {session?.user ? (
            <AvatarMenu className="ml-2 h-8 w-8">
              <Avatar firstName={profile?.firstName} lastName={profile?.lastName} />
            </AvatarMenu>
          ) : (
            <>
              <Link href="/login" passHref>
                <a className="button ghost">Login</a>
              </Link>

              <Link href="/sign-up" passHref>
                <a className="button primary ml-2">Create Account</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
