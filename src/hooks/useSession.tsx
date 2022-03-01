import * as React from 'react'
import supabase from '~/services/supabase'

const useSession = () => {
  const [session, setSession] = React.useState(supabase.auth.session())

  React.useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  return session
}

export default useSession
