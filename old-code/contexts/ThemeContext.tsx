import * as React from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>('light')

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSetColorMode = () => {
      setTheme(media.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', handleSetColorMode)

    handleSetColorMode()

    return () => {
      media.removeEventListener('change', handleSetColorMode)
    }
  }, [])

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
export default ThemeContext
