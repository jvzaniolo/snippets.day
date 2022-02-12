import * as React from 'react'

type ColorMode = 'dark' | 'light' | undefined

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

let ThemeContext = React.createContext<{ colorMode: ColorMode; toggleColorMode(color: ColorMode): void } | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  let [colorMode, setColorMode] = React.useState<ColorMode>()

  useIsomorphicLayoutEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    let handleSetColorMode = () => {
      setColorMode(media.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', handleSetColorMode)

    handleSetColorMode()

    return () => {
      media.removeEventListener('change', handleSetColorMode)
    }
  }, [])

  React.useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [colorMode])

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        toggleColorMode(color: ColorMode) {
          setColorMode(color)
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  let context = React.useContext(ThemeContext)

  if (typeof context === 'undefined' || context === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
