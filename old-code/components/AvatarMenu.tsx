import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import supabase from '~/services/supabase'

const DropdownItem = ({ children }: { children: React.ReactNode }) => (
  <DropdownMenu.Item className="flex rounded px-2 py-1 outline-none hover:bg-moon-100 dark:text-moon-200 dark:hover:bg-moon-600">
    {children}
  </DropdownMenu.Item>
)

export default function ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={`${className} flex outline-none`}>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mt-2 min-w-[220px] rounded-lg bg-white p-2 shadow-lg dark:bg-moon-700">
        <DropdownItem>
          <Link href="/profile">
            <a className="flex-1">Profile</a>
          </Link>
        </DropdownItem>

        <DropdownMenu.Separator className="m-1 h-[1px] bg-moon-100 dark:bg-moon-600" />

        <DropdownItem>
          <button className="flex flex-1" onClick={() => supabase.auth.signOut()}>
            Log out
          </button>
        </DropdownItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
